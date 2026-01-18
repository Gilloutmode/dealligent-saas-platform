#!/bin/bash

# =============================================================================
# Dealligent tmux Multi-Window Session
# Cree une session tmux avec 5 panneaux pour les experts
# =============================================================================

PROJECT_DIR="$HOME/Desktop/Dealligent SAAS Platform Project/Dealligent-Platform-MVP"
TEMPLATES_DIR="$PROJECT_DIR/.claude/templates"
SESSION_NAME="dealligent"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Dealligent tmux Session Launcher${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verifier que tmux est installe
if ! command -v tmux &> /dev/null; then
    echo -e "${YELLOW}tmux n'est pas installe.${NC}"
    echo "Installation: brew install tmux"
    exit 1
fi

# Tuer session existante si presente
tmux kill-session -t $SESSION_NAME 2>/dev/null

# Creer nouvelle session avec premiere fenetre (Orchestrateur)
echo -e "${GREEN}Creating tmux session...${NC}"

tmux new-session -d -s $SESSION_NAME -n "orchestrator" -c "$PROJECT_DIR"
tmux send-keys -t $SESSION_NAME:orchestrator "cp '$TEMPLATES_DIR/orchestrator-window.md' CLAUDE.local.md && clear && echo '🎯 ORCHESTRATEUR Ready' && claude" C-m

# Fenetre 2: Architect
tmux new-window -t $SESSION_NAME -n "architect" -c "$PROJECT_DIR"
tmux send-keys -t $SESSION_NAME:architect "cp '$TEMPLATES_DIR/architect-window.md' CLAUDE.local.md && clear && echo '🏗️  ARCHITECT Ready' && claude" C-m

# Fenetre 3: Frontend
tmux new-window -t $SESSION_NAME -n "frontend" -c "$PROJECT_DIR"
tmux send-keys -t $SESSION_NAME:frontend "cp '$TEMPLATES_DIR/CLAUDE.local.frontend.md' CLAUDE.local.md && clear && echo '⚛️  FRONTEND Ready' && claude" C-m

# Fenetre 4: Backend
tmux new-window -t $SESSION_NAME -n "backend" -c "$PROJECT_DIR"
tmux send-keys -t $SESSION_NAME:backend "cp '$TEMPLATES_DIR/backend-window.md' CLAUDE.local.md && clear && echo '⚙️  BACKEND Ready' && claude" C-m

# Fenetre 5: Reviewer
tmux new-window -t $SESSION_NAME -n "reviewer" -c "$PROJECT_DIR"
tmux send-keys -t $SESSION_NAME:reviewer "cp '$TEMPLATES_DIR/reviewer-window.md' CLAUDE.local.md && clear && echo '✅ REVIEWER Ready' && claude" C-m

# Revenir a la premiere fenetre
tmux select-window -t $SESSION_NAME:orchestrator

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Session tmux '$SESSION_NAME' creee!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Fenetres tmux (Ctrl+B puis numero):"
echo "  0: orchestrator  - Brainstorming"
echo "  1: architect     - Design & ADRs"
echo "  2: frontend      - React/TypeScript"
echo "  3: backend       - n8n Workflows"
echo "  4: reviewer      - Code Review"
echo ""
echo "Commandes tmux utiles:"
echo "  Ctrl+B, n     - Fenetre suivante"
echo "  Ctrl+B, p     - Fenetre precedente"
echo "  Ctrl+B, 0-4   - Aller a fenetre specifique"
echo "  Ctrl+B, d     - Detacher (session reste active)"
echo "  tmux attach   - Rattacher a la session"
echo ""

# Attacher a la session
tmux attach-session -t $SESSION_NAME
