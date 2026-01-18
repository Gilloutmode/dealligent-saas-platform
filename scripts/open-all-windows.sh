#!/bin/bash

# Dealligent Multi-Window Launcher
PROJECT="$HOME/Desktop/Dealligent SAAS Platform Project/Dealligent-Platform-MVP"

echo "Lancement des 5 fenetres Dealligent..."
echo "NE TOUCHEZ PAS AU CLAVIER pendant 30 secondes"
echo ""

# Ouvrir Ghostty
open -a Ghostty
sleep 2

# Fonction pour lancer une fenetre
launch() {
    local name=$1
    local template=$2

    echo "[$name] Copie du template..."
    cp "$PROJECT/.claude/templates/$template" "$PROJECT/CLAUDE.local.md"
    sleep 1

    echo "[$name] Ouverture fenetre..."
    osascript -e 'tell application "Ghostty" to activate'
    osascript -e 'tell application "System Events" to tell process "Ghostty" to keystroke "n" using command down'
    sleep 2

    echo "[$name] Lancement Claude..."
    osascript -e 'tell application "System Events" to tell process "Ghostty" to keystroke "cd ~/Desktop/Dealligent\\ SAAS\\ Platform\\ Project/Dealligent-Platform-MVP && claude"'
    osascript -e 'tell application "System Events" to tell process "Ghostty" to key code 36'
    sleep 5

    echo "[$name] OK"
}

# Premiere fenetre (deja ouverte)
echo "[ORCHESTRATEUR] Configuration..."
cp "$PROJECT/.claude/templates/orchestrator-window.md" "$PROJECT/CLAUDE.local.md"
sleep 1
osascript -e 'tell application "System Events" to tell process "Ghostty" to keystroke "cd ~/Desktop/Dealligent\\ SAAS\\ Platform\\ Project/Dealligent-Platform-MVP && claude"'
osascript -e 'tell application "System Events" to tell process "Ghostty" to key code 36'
echo "[ORCHESTRATEUR] OK"
sleep 5

# Autres fenetres
launch "ARCHITECT" "architect-window.md"
launch "FRONTEND" "CLAUDE.local.frontend.md"
launch "BACKEND" "backend-window.md"
launch "REVIEWER" "reviewer-window.md"

echo ""
echo "========================================"
echo "Termine! 5 fenetres Claude Code ouvertes"
echo "========================================"
