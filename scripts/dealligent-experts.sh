#!/bin/bash
# Dealligent Expert Windows - All in ONE Ghostty window with TABS
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
PROJECT_DIR="$HOME/Desktop/Dealligent SAAS Platform Project/Dealligent-Platform-MVP"

echo "=== Dealligent Expert Windows ==="
echo "Ouverture de Ghostty avec 5 tabs experts..."

# Kill existing expert processes
pkill -f "ghostty.*launch-" 2>/dev/null
sleep 1

# Launch Ghostty and create tabs via AppleScript
osascript << 'EOF'
tell application "Ghostty" to activate
delay 1

tell application "System Events"
    tell process "Ghostty"
        -- Tab 1: Frontend (use existing or new window)
        keystroke "t" using command down
        delay 0.5
        
        -- Tab 2: Backend
        keystroke "t" using command down
        delay 0.5
        
        -- Tab 3: Architect  
        keystroke "t" using command down
        delay 0.5
        
        -- Tab 4: Reviewer
        keystroke "t" using command down
        delay 0.5
        
        -- Tab 5: Orchestrator
        keystroke "t" using command down
        delay 0.5
    end tell
end tell
EOF

echo ""
echo "5 tabs créés. Utilise Cmd+Shift+[ et Cmd+Shift+] pour naviguer."
echo ""
echo "Dans chaque tab, lance manuellement:"
echo "  Tab 1: ./scripts/launch-frontend.sh"
echo "  Tab 2: ./scripts/launch-backend.sh"
echo "  Tab 3: ./scripts/launch-architect.sh"
echo "  Tab 4: ./scripts/launch-reviewer.sh"
echo "  Tab 5: ./scripts/launch-orchestrator.sh"
