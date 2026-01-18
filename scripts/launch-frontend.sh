#!/bin/bash
# Dealligent - Frontend Expert Window
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd ~/Desktop/Dealligent\ SAAS\ Platform\ Project/Dealligent-Platform-MVP

# Backup current CLAUDE.local.md
cp CLAUDE.local.md CLAUDE.local.md.backup 2>/dev/null

# Load Frontend template
cp .claude/templates/CLAUDE.local.frontend.md CLAUDE.local.md

echo "=== Dealligent - FRONTEND EXPERT ==="
echo "Template: CLAUDE.local.frontend.md"
echo "MCP: magic, playwright, github, context7"
echo ""
exec claude
