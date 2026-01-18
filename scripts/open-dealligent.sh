#!/bin/bash

# =============================================================================
# Dealligent - Lance 5 experts dans 5 fenetres Ghostty separees
# N'affecte pas les autres fenetres existantes
# =============================================================================

PROJECT_DIR="$HOME/Desktop/Dealligent SAAS Platform Project/Dealligent-Platform-MVP"
TEMPLATES_DIR="$PROJECT_DIR/.claude/templates"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Dealligent Expert Windows${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Fonction pour lancer une fenetre
launch_window() {
    local name=$1
    local template=$2
    local emoji=$3

    # Lance ghostty avec la commande
    ghostty --title="$name - Dealligent" -e bash -c "
        cd '$PROJECT_DIR'
        cp '$TEMPLATES_DIR/$template' CLAUDE.local.md
        echo '$emoji $name Ready'
        echo 'Template: $template'
        echo ''
        exec claude
    " &

    echo -e "${GREEN}✓${NC} $name"
}

echo "Ouverture des 5 fenetres..."
echo ""

launch_window "1-ORCH Dealligent" "orchestrator-window.md" "🎯"
sleep 1
launch_window "2-ARCH Dealligent" "architect-window.md" "🏗️"
sleep 1
launch_window "3-FRONT Dealligent" "CLAUDE.local.frontend.md" "⚛️"
sleep 1
launch_window "4-BACK Dealligent" "backend-window.md" "⚙️"
sleep 1
launch_window "5-REVIEW Dealligent" "reviewer-window.md" "✅"

echo ""
echo -e "${GREEN}5 fenetres Dealligent ouvertes!${NC}"
echo ""
