#!/bin/bash

# n8n Webhook Test Script - CDS-RAG DASHBOARD V12.0
# Usage: ./test-webhook.sh [test_type] [competitor_name]
# test_type: basic, full, minimal, invalid

set -e

WEBHOOK_URL="https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${CYAN}=== n8n Webhook Test - CDS-RAG DASHBOARD V12.0 ===${NC}"
echo "URL: $WEBHOOK_URL"
echo ""

TEST_TYPE="${1:-basic}"
COMPETITOR="${2:-nTopology}"

case $TEST_TYPE in
  basic)
    echo -e "${GREEN}Test: Basic Analysis${NC}"
    echo "Competitor: $COMPETITOR"
    PAYLOAD="{
      \"chatInput\": \"$COMPETITOR\",
      \"sources\": [\"Perplexity\", \"Exa\"],
      \"depth\": \"detailed\"
    }"
    ;;

  full)
    echo -e "${GREEN}Test: Full Analysis (all sources)${NC}"
    echo "Competitor: $COMPETITOR"
    PAYLOAD="{
      \"chatInput\": \"$COMPETITOR\",
      \"sources\": [\"Perplexity\", \"Exa\", \"SerpAPI\"],
      \"depth\": \"detailed\"
    }"
    ;;

  minimal)
    echo -e "${GREEN}Test: Minimal Analysis (defaults)${NC}"
    echo "Competitor: $COMPETITOR"
    PAYLOAD="{
      \"chatInput\": \"$COMPETITOR\"
    }"
    ;;

  perplexity)
    echo -e "${GREEN}Test: Perplexity Only${NC}"
    echo "Competitor: $COMPETITOR"
    PAYLOAD="{
      \"chatInput\": \"$COMPETITOR\",
      \"sources\": [\"Perplexity\"],
      \"depth\": \"detailed\"
    }"
    ;;

  invalid)
    echo -e "${RED}Test: Invalid Payload (missing chatInput)${NC}"
    PAYLOAD='{
      "sources": ["Perplexity"],
      "depth": "detailed"
    }'
    ;;

  *)
    echo "Unknown test type: $TEST_TYPE"
    echo ""
    echo "Usage: ./test-webhook.sh [test_type] [competitor_name]"
    echo ""
    echo "Test types:"
    echo "  basic      - Perplexity + Exa (default)"
    echo "  full       - All sources (Perplexity, Exa, SerpAPI)"
    echo "  minimal    - chatInput only (uses workflow defaults)"
    echo "  perplexity - Perplexity AI only"
    echo "  invalid    - Missing chatInput (should fail)"
    echo ""
    echo "Examples:"
    echo "  ./test-webhook.sh basic nTopology"
    echo "  ./test-webhook.sh full \"Altair Inspire\""
    echo "  ./test-webhook.sh minimal \"Siemens NX\""
    exit 1
    ;;
esac

echo ""
echo "Payload:"
echo "$PAYLOAD" | jq .
echo ""

echo -e "${CYAN}Sending request...${NC}"
echo -e "${YELLOW}(This may take 30-120 seconds)${NC}"
echo ""

# Send request and capture response + status
START_TIME=$(date +%s)
HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "$WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD")
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Extract body and status code (macOS compatible)
HTTP_STATUS=$(echo "$HTTP_RESPONSE" | tail -n 1)
HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed '$d')

echo "Status: $HTTP_STATUS"
echo "Duration: ${DURATION}s"
echo ""
echo "Response:"
echo "$HTTP_BODY" | jq . 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Validate response
if [ "$HTTP_STATUS" -eq 200 ]; then
  echo -e "${GREEN}✓ Request successful${NC}"

  # Check required fields
  SUCCESS=$(echo "$HTTP_BODY" | jq -r '.success' 2>/dev/null)
  COMPETITOR_NAME=$(echo "$HTTP_BODY" | jq -r '.data.competitor' 2>/dev/null)
  THREAT_LEVEL=$(echo "$HTTP_BODY" | jq -r '.data.threatLevel' 2>/dev/null)
  GRADE=$(echo "$HTTP_BODY" | jq -r '.data.intelligenceGrade' 2>/dev/null)
  TIMESTAMP=$(echo "$HTTP_BODY" | jq -r '.timestamp' 2>/dev/null)

  if [ "$SUCCESS" = "true" ]; then
    echo -e "${GREEN}✓ success: true${NC}"
  else
    echo -e "${RED}✗ success should be true, got: $SUCCESS${NC}"
  fi

  if [ -n "$COMPETITOR_NAME" ] && [ "$COMPETITOR_NAME" != "null" ]; then
    echo -e "${GREEN}✓ competitor: $COMPETITOR_NAME${NC}"
  else
    echo -e "${RED}✗ missing data.competitor${NC}"
  fi

  if [ -n "$THREAT_LEVEL" ] && [ "$THREAT_LEVEL" != "null" ]; then
    echo -e "${GREEN}✓ threatLevel: $THREAT_LEVEL${NC}"
  else
    echo -e "${YELLOW}⚠ missing data.threatLevel${NC}"
  fi

  if [ -n "$GRADE" ] && [ "$GRADE" != "null" ]; then
    echo -e "${GREEN}✓ intelligenceGrade: $GRADE${NC}"
  else
    echo -e "${YELLOW}⚠ missing data.intelligenceGrade${NC}"
  fi

  if [ -n "$TIMESTAMP" ] && [ "$TIMESTAMP" != "null" ]; then
    echo -e "${GREEN}✓ timestamp: $TIMESTAMP${NC}"
  else
    echo -e "${YELLOW}⚠ missing timestamp${NC}"
  fi

elif [ "$HTTP_STATUS" -eq 400 ] && [ "$TEST_TYPE" = "invalid" ]; then
  echo -e "${GREEN}✓ Correctly rejected invalid payload${NC}"
else
  echo -e "${RED}✗ Unexpected status: $HTTP_STATUS${NC}"
fi

echo ""
echo -e "${CYAN}=== Test Complete ===${NC}"
