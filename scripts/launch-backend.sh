#!/bin/bash
# Dealligent - Backend Expert Window
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd ~/Desktop/Dealligent\ SAAS\ Platform\ Project/Dealligent-Platform-MVP

# Backup current CLAUDE.local.md
cp CLAUDE.local.md CLAUDE.local.md.backup 2>/dev/null

# Load Backend template
cp .claude/templates/backend-window.md CLAUDE.local.md

echo "=== Dealligent - BACKEND EXPERT ==="
echo "Template: backend-window.md"
echo "MCP: github, playwright, context7"
echo ""
exec claude
