#!/bin/bash

# =============================================================================
# Dealligent Single Window Launcher
# Ouvre une fenetre specifique
# Usage: ./open-window.sh [orchestrator|architect|frontend|backend|reviewer]
# =============================================================================

PROJECT_DIR="$HOME/Desktop/Dealligent SAAS Platform Project/Dealligent-Platform-MVP"
TEMPLATES_DIR="$PROJECT_DIR/.claude/templates"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

show_usage() {
    echo -e "${BLUE}Dealligent Window Launcher${NC}"
    echo ""
    echo "Usage: $0 [window]"
    echo ""
    echo "Windows disponibles:"
    echo "  orchestrator  - Brainstorming & Coordination (read-only)"
    echo "  architect     - Design & ADRs (read-only)"
    echo "  frontend      - React/TypeScript (peut coder)"
    echo "  backend       - n8n Workflows (peut coder)"
    echo "  reviewer      - Code Review & QA (read-only)"
    echo "  all           - Ouvre toutes les fenetres"
    echo ""
    echo "Exemples:"
    echo "  $0 frontend"
    echo "  $0 all"
}

open_single_window() {
    local name=$1
    local template=$2
    local emoji=$3

    cd "$PROJECT_DIR"
    cp "$TEMPLATES_DIR/$template" CLAUDE.local.md
    echo -e "${GREEN}$emoji $name Window Ready${NC}"
    echo "Template: $template"
    echo ""
    exec claude
}

open_new_ghostty_window() {
    local name=$1
    local template=$2
    local emoji=$3

    # Ouvre dans une nouvelle fenetre Ghostty
    ghostty -e bash -c "cd '$PROJECT_DIR' && cp '$TEMPLATES_DIR/$template' CLAUDE.local.md && echo '$emoji $name Window Ready' && claude; exec bash" &
    echo -e "${GREEN}$emoji $name Window opened in new Ghostty window${NC}"
}

# Si pas d'argument, afficher usage
if [ $# -eq 0 ]; then
    show_usage
    exit 0
fi

case "$1" in
    orchestrator|orch|o)
        open_single_window "ORCHESTRATEUR" "orchestrator-window.md" "🎯"
        ;;
    architect|arch|a)
        open_single_window "ARCHITECT" "architect-window.md" "🏗️"
        ;;
    frontend|front|f)
        open_single_window "FRONTEND" "CLAUDE.local.frontend.md" "⚛️"
        ;;
    backend|back|b)
        open_single_window "BACKEND" "backend-window.md" "⚙️"
        ;;
    reviewer|review|r)
        open_single_window "REVIEWER" "reviewer-window.md" "✅"
        ;;
    all)
        echo -e "${BLUE}Ouverture de toutes les fenetres...${NC}"
        "$PROJECT_DIR/scripts/open-all-windows.sh"
        ;;
    help|-h|--help)
        show_usage
        ;;
    *)
        echo -e "${RED}Erreur: Window '$1' non reconnue${NC}"
        echo ""
        show_usage
        exit 1
        ;;
esac
