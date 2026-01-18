#!/bin/bash
# Dealligent - Orchestrator Window
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd ~/Desktop/Dealligent\ SAAS\ Platform\ Project/Dealligent-Platform-MVP

# Backup current CLAUDE.local.md
cp CLAUDE.local.md CLAUDE.local.md.backup 2>/dev/null

# Load Orchestrator template
cp .claude/templates/orchestrator-window.md CLAUDE.local.md

echo "=== Dealligent - ORCHESTRATOR ==="
echo "Template: orchestrator-window.md"
echo "MCP: github, sequential-thinking, context7"
echo ""
exec claude
