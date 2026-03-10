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
RESOURCE_URL="/hacsfiles/${CARD_NAME}/${CARD_NAME}.js?v=${VERSION}"

# Check HA WebSocket auth. Returns 0 = OK, 1 = auth invalid, 2 = no token/websocat, 3 = connection/network failure.
check_ha_auth() {
    if [ -z "$HA_TOKEN" ]; then
        return 2
    fi
    if ! command -v websocat &> /dev/null; then
        return 2
    fi
    # HA sends auth_required first, then auth_ok/auth_invalid after our auth - read until we get the auth result
    local auth_line
    auth_line=$({ printf '{"type":"auth","access_token":"%s"}\n' "$HA_TOKEN"; sleep 2; } \
        | websocat ws://${HA_HOST}:${HA_PORT}/api/websocket 2>/dev/null \
        | grep -m1 -E '"type":"auth_ok"|"type":"auth_invalid"')
    if echo "$auth_line" | grep -q '"type":"auth_ok"'; then
        return 0
    fi
    if echo "$auth_line" | grep -q '"type":"auth_invalid"'; then
        return 1
    fi
    # No auth_ok and no auth_invalid: connection refused, timeout, or unreachable host
    return 3
}

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
    local new_url="$RESOURCE_URL"
    
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
    if [ -t 0 ]; then
        read -p "Press Enter to continue or Ctrl+C to cancel..."
    else
        echo "Non-interactive run: skipping prompt (use SSH keys to avoid password)."
    fi
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

# Ensure www directory exists on remote (fail with clear message if SSH/login fails)
echo -e "${YELLOW}Ensuring www directory exists...${NC}"
if ! ssh -o ConnectTimeout=10 ${HA_USER}@${HA_HOST} "mkdir -p ${HA_WWW_PATH}"; then
    echo -e "${RED}Deploy failed: could not connect or authenticate to ${HA_USER}@${HA_HOST}${NC}" >&2
    echo "Check host, user, and SSH keys (e.g. ssh-copy-id ${HA_USER}@${HA_HOST})." >&2
    exit 1
fi

# Fix permissions on remote directory (in case it's owned by root)
echo -e "${YELLOW}Fixing remote directory permissions...${NC}"
ssh ${HA_USER}@${HA_HOST} "sudo chown -R ${HA_USER}:${HA_USER} ${HA_WWW_PATH} 2>/dev/null || true"

# Copy to Home Assistant using rsync (scp often fails on HA OS)
echo -e "${YELLOW}Deploying to Home Assistant...${NC}"

# Generate gzip version for better performance
gzip -9 -c "$PROJECT_DIR/dist/${CARD_NAME}.js" > "$PROJECT_DIR/dist/${CARD_NAME}.js.gz"
if [ ! -f "$PROJECT_DIR/dist/${CARD_NAME}.js.gz" ] || [ ! -s "$PROJECT_DIR/dist/${CARD_NAME}.js.gz" ]; then
    echo -e "${RED}Failed to create .js.gz${NC}" >&2
    exit 1
fi

# Copy .js and .js.gz separately so both are always deployed
if ! rsync -az --checksum "$PROJECT_DIR/dist/${CARD_NAME}.js" "${HA_USER}@${HA_HOST}:${HA_WWW_PATH}/" \
     || ! rsync -az --checksum "$PROJECT_DIR/dist/${CARD_NAME}.js.gz" "${HA_USER}@${HA_HOST}:${HA_WWW_PATH}/"; then
    echo -e "${RED}Deploy failed: could not copy files to ${HA_USER}@${HA_HOST}${NC}" >&2
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployed ${CARD_NAME}.js and ${CARD_NAME}.js.gz${NC}"
echo ""

# Update Lovelace resource URL via WebSocket
echo -e "${YELLOW}Updating Lovelace resource URL...${NC}"
if [ -n "$HA_TOKEN" ] && command -v websocat &> /dev/null; then
    if ! check_ha_auth; then
        AUTH_RESULT=$?
        echo -e "${RED}Deploy failed: could not login to Home Assistant${NC}" >&2
        case $AUTH_RESULT in
            1)
                echo "Invalid or expired token in scripts/HA_TOKEN." >&2
                echo "Generate a new one at: Profile → Security → Long-Lived Access Tokens" >&2
                ;;
            3)
                echo "Cannot reach Home Assistant at ${HA_HOST}:${HA_PORT}." >&2
                echo "Check HA_HOST, HA_PORT, and that HA is running and reachable (e.g. ping ${HA_HOST})." >&2
                ;;
            *)
                echo "Check HA_HOST (${HA_HOST}), HA_PORT (${HA_PORT}), and network." >&2
                ;;
        esac
        exit 1
    fi
fi
if update_lovelace_resource; then
    echo -e "${GREEN}✅ Resource URL updated!${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  New resource URL:"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}${RESOURCE_URL}${NC}"
    echo ""
    echo -e "${GREEN}Just refresh your browser to see changes!${NC}"
else
    UPDATE_RESULT=$?
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
            echo -e "${RED}Deploy failed: Lovelace resource not found${NC}" >&2
            echo ""
            echo "Add the card to Lovelace resources first (Settings → Dashboards → ⋮ → Resources):"
            echo ""
            echo "  URL:  ${RESOURCE_URL}"
            echo "  Type: JavaScript Module"
            echo ""
            exit 1
            ;;
        *)
            echo -e "${RED}Deploy failed: could not update Lovelace resource URL${NC}" >&2
            echo "Check HA logs or try updating the resource URL manually in Settings → Dashboards → Resources." >&2
            echo ""
            exit 1
            ;;
    esac
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  Resource URL (update manually if needed):"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}${RESOURCE_URL}${NC}"
    echo ""
fi
echo ""
