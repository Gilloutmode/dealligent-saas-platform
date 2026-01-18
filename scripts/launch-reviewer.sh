#!/bin/bash
# Dealligent - Reviewer Expert Window
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd ~/Desktop/Dealligent\ SAAS\ Platform\ Project/Dealligent-Platform-MVP

# Backup current CLAUDE.local.md
cp CLAUDE.local.md CLAUDE.local.md.backup 2>/dev/null

# Load Reviewer template
cp .claude/templates/reviewer-window.md CLAUDE.local.md

echo "=== Dealligent - REVIEWER EXPERT ==="
echo "Template: reviewer-window.md"
echo "MCP: github, playwright, context7"
echo ""
exec claude
