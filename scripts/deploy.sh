#!/bin/bash

# ============================================================================
# Pianobar Media Player Card - Local Deploy Script
# ============================================================================
# Deploys the card and updates the Lovelace resource URL via WebSocket.
# No HA restart needed - just refresh your browser!
#
# Requirements:
#   - websocat (brew install websocat)
#   - HA long-lived access token in scripts/HA_TOKEN
# ============================================================================
# Configuration: Edit these values for your Home Assistant setup
# ============================================================================

HA_HOST="${HA_HOST:-homeassistant.local}"  # HA hostname or IP (env var or default)
HA_USER="${HA_USER:-$USER}"                 # SSH user (defaults to current user)
HA_WWW_PATH="${HA_WWW_PATH:-/config/www/community/pianobar-media-player-card}"   # www directory on HA server
HA_PORT="${HA_PORT:-8123}"                  # HA web port for API calls
CARD_NAME="pianobar-media-player-card"

# Load HA token from file (for API calls)
# Generate one at: Profile -> Security -> Long-Lived Access Tokens -> Create Token
TOKEN_FILE="$(dirname "$0")/HA_TOKEN"
if [ -f "$TOKEN_FILE" ]; then
    HA_TOKEN=$(cat "$TOKEN_FILE" | tr -d '[:space:]')
else
    HA_TOKEN=""
fi

# ============================================================================
# Script
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Generate cache-bust version (Unix timestamp)
VERSION=$(date +%s)

# Function to get resource ID for our card via WebSocket
get_resource_id() {
    if [ -z "$HA_TOKEN" ]; then
        return 1
    fi
    
    if ! command -v websocat &> /dev/null; then
        return 2
    fi
    
    local response
    response=$({ printf '{"type":"auth","access_token":"%s"}\n{"id":1,"type":"lovelace/resources"}\n' "$HA_TOKEN"; sleep 1; } \
        | websocat ws://${HA_HOST}:${HA_PORT}/api/websocket 2>/dev/null \
        | grep -o '"id":"[^"]*"[^}]*"url":"[^"]*'"${CARD_NAME}"'[^"]*"' \
        | head -1)
    
    if [ -z "$response" ]; then
        return 3  # Resource not found
    fi
    
    # Extract the ID from the response
    echo "$response" | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//'
}

# Function to update Lovelace resource URL via WebSocket (instant, no restart needed)
update_lovelace_resource() {
    local new_url="/hacsfiles/${CARD_NAME}/${CARD_NAME}.js?v=${VERSION}"
    
    if [ -z "$HA_TOKEN" ]; then
        return 1  # No token
    fi
    
    if ! command -v websocat &> /dev/null; then
        return 2  # websocat not installed
    fi
    
    # Get the resource ID dynamically
    local resource_id
    resource_id=$(get_resource_id)
    
    if [ -z "$resource_id" ]; then
        return 3  # Resource not found
    fi
    
    # Update the resource via WebSocket
    local response
    response=$({ printf '{"type":"auth","access_token":"%s"}\n{"id":1,"type":"lovelace/resources/update","resource_id":"%s","url":"%s"}\n' \
        "$HA_TOKEN" "$resource_id" "$new_url"; sleep 1; } \
        | websocat ws://${HA_HOST}:${HA_PORT}/api/websocket 2>/dev/null \
        | head -3)
    
    if echo "$response" | grep -q '"success":true'; then
        return 0  # Success
    else
        return 4  # Update failed
    fi
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Pianobar Media Player Card - Deploy${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check for SSH key authentication
echo -e "${YELLOW}Checking SSH connection...${NC}"
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 ${HA_USER}@${HA_HOST} exit 2>/dev/null; then
    echo -e "${YELLOW}⚠ SSH key authentication not set up${NC}"
    echo ""
    echo "To avoid password prompts on every deployment, set up SSH keys:"
    echo -e "  ${GREEN}ssh-copy-id ${HA_USER}@${HA_HOST}${NC}"
    echo ""
    echo "You will be prompted for your password during this deployment."
    echo ""
    read -p "Press Enter to continue or Ctrl+C to cancel..."
fi

# Always build first
echo -e "${YELLOW}Building...${NC}"
cd "$PROJECT_DIR"
npm run build --silent
echo ""

# Show file info
FILE_SIZE=$(ls -lh "$PROJECT_DIR/dist/${CARD_NAME}.js" | awk '{print $5}')
echo -e "📦 File: ${CARD_NAME}.js (${FILE_SIZE})"
echo -e "🎯 Target: ${HA_USER}@${HA_HOST}:${HA_WWW_PATH}/"
echo ""

# Ensure www directory exists on remote
echo -e "${YELLOW}Ensuring www directory exists...${NC}"
ssh ${HA_USER}@${HA_HOST} "mkdir -p ${HA_WWW_PATH}"

# Fix permissions on remote directory (in case it's owned by root)
echo -e "${YELLOW}Fixing remote directory permissions...${NC}"
ssh ${HA_USER}@${HA_HOST} "sudo chown -R ${HA_USER}:${HA_USER} ${HA_WWW_PATH} 2>/dev/null || true"

# Copy to Home Assistant using rsync (scp often fails on HA OS)
echo -e "${YELLOW}Deploying to Home Assistant...${NC}"
rsync -az --checksum \
    "$PROJECT_DIR/dist/${CARD_NAME}.js" \
    "${HA_USER}@${HA_HOST}:${HA_WWW_PATH}/"

echo ""
echo -e "${GREEN}✅ File deployed successfully!${NC}"
echo ""

# Update Lovelace resource URL via WebSocket
echo -e "${YELLOW}Updating Lovelace resource URL...${NC}"
if update_lovelace_resource; then
    echo -e "${GREEN}✅ Resource URL updated!${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  New resource URL:"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}/hacsfiles/${CARD_NAME}/${CARD_NAME}.js?v=${VERSION}${NC}"
    echo ""
    echo -e "${GREEN}Just refresh your browser to see changes!${NC}"
else
    UPDATE_RESULT=$?
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  Resource URL:"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}/hacsfiles/${CARD_NAME}/${CARD_NAME}.js?v=${VERSION}${NC}"
    echo ""
    
    case $UPDATE_RESULT in
        1)
            echo -e "${YELLOW}⚠ No HA token - cannot update resource automatically${NC}"
            echo ""
            echo "To enable automatic updates, create scripts/HA_TOKEN with your token."
            echo "Generate one at: Profile → Security → Long-Lived Access Tokens"
            ;;
        2)
            echo -e "${YELLOW}⚠ websocat not installed - cannot update resource automatically${NC}"
            echo ""
            echo "Install with: brew install websocat"
            ;;
        3)
            echo -e "${YELLOW}⚠ Resource not found - add it first in HA${NC}"
            echo ""
            echo "Add to Lovelace resources (Settings → Dashboards → ⋮ → Resources):"
            echo ""
            echo "  URL:  /hacsfiles/${CARD_NAME}/${CARD_NAME}.js?v=${VERSION}"
            echo "  Type: JavaScript Module"
            ;;
        *)
            echo -e "${YELLOW}⚠ Could not update resource automatically${NC}"
            ;;
    esac
    echo ""
    echo -e "${YELLOW}Manually update the resource URL in HA, then refresh browser${NC}"
fi
echo ""
