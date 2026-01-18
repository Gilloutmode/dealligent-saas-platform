#!/bin/bash
# Dealligent - Architect Expert Window
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd ~/Desktop/Dealligent\ SAAS\ Platform\ Project/Dealligent-Platform-MVP

# Backup current CLAUDE.local.md
cp CLAUDE.local.md CLAUDE.local.md.backup 2>/dev/null

# Load Architect template
cp .claude/templates/architect-window.md CLAUDE.local.md

echo "=== Dealligent - ARCHITECT EXPERT ==="
echo "Template: architect-window.md"
echo "MCP: github, sequential-thinking, context7"
echo ""
exec claude
