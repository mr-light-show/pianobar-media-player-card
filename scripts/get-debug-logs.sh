#!/bin/bash

# ============================================================================
# Pianobar Media Player Card - Debug Log Collection Script
# ============================================================================
# Collects frontend and backend debug logs in a format ready for Cursor AI
# ============================================================================

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
HA_HOST="${HA_HOST:-homeassistant.local}"
HA_USER="${HA_USER:-khawes}"
FRONTEND_LOG="/Users/khawes/stash/remote_pianobar_card/.cursor/debug.log"
BACKEND_LOG="/config/pianobar_debug.log"

# Output file (optional - if you want to save to file)
OUTPUT_FILE="${1:-}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Pianobar Debug Log Collection${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function to create formatted output
format_logs() {
    echo "# Pianobar Media Player Card - Debug Logs"
    echo ""
    echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    echo "---"
    echo ""
    
    # Frontend Log
    echo "## Frontend Debug Log"
    echo ""
    echo '```'
    if [ -f "$FRONTEND_LOG" ]; then
        cat "$FRONTEND_LOG"
    else
        echo "Frontend log not found at: $FRONTEND_LOG"
    fi
    echo '```'
    echo ""
    echo "---"
    echo ""
    
    # Backend Log
    echo "## Backend Debug Log (Home Assistant)"
    echo ""
    echo '```'
    ssh ${HA_USER}@${HA_HOST} "sudo cat ${BACKEND_LOG}" 2>/dev/null || echo "Could not retrieve backend log from ${HA_USER}@${HA_HOST}:${BACKEND_LOG}"
    echo '```'
    echo ""
    echo "---"
}

# Generate the formatted output
OUTPUT=$(format_logs)

# Display to terminal
echo -e "${CYAN}Collecting logs...${NC}"
echo ""

# If output file specified, save to file
if [ -n "$OUTPUT_FILE" ]; then
    echo "$OUTPUT" > "$OUTPUT_FILE"
    echo -e "${GREEN}✅ Logs saved to: ${OUTPUT_FILE}${NC}"
    echo ""
    echo -e "${YELLOW}You can now paste the contents into Cursor's debug mode${NC}"
else
    # Copy to clipboard if available
    if command -v pbcopy &> /dev/null; then
        echo "$OUTPUT" | pbcopy
        echo -e "${GREEN}✅ Logs copied to clipboard!${NC}"
        echo ""
        echo -e "${YELLOW}Simply paste (Cmd+V) into Cursor's debug mode${NC}"
    elif command -v xclip &> /dev/null; then
        echo "$OUTPUT" | xclip -selection clipboard
        echo -e "${GREEN}✅ Logs copied to clipboard!${NC}"
        echo ""
        echo -e "${YELLOW}Simply paste (Ctrl+V) into Cursor's debug mode${NC}"
    else
        # No clipboard available, just output to terminal
        echo -e "${YELLOW}Clipboard tool not available. Here's the formatted output:${NC}"
        echo ""
        echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "$OUTPUT"
        echo ""
        echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo -e "${YELLOW}Copy the output above and paste into Cursor's debug mode${NC}"
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Done!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

