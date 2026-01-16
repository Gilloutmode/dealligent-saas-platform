#!/bin/bash

# n8n Webhook Test Script - CDS-RAG PROD V11.2
# Usage: ./test-webhook.sh [test_type]
# test_type: basic, competitor, product, market, technology, invalid

set -e

WEBHOOK_URL="https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}=== n8n Webhook Test ===${NC}"
echo "URL: $WEBHOOK_URL"
echo ""

TEST_TYPE="${1:-basic}"

case $TEST_TYPE in
  basic|competitor)
    echo -e "${GREEN}Test: Competitor Analysis${NC}"
    PAYLOAD='{
      "analysis_type": "competitor",
      "competitors": ["nTopology", "Altair"],
      "sources": {
        "perplexity": true,
        "exaDeep": true,
        "serpNews": true,
        "serpLinkedin": false,
        "techDocs": false,
        "patents": false
      },
      "company_context": {
        "name": "CDS",
        "industry": "CAO/FAO"
      }
    }'
    ;;

  product)
    echo -e "${GREEN}Test: Product Analysis${NC}"
    PAYLOAD='{
      "analysis_type": "product",
      "competitors": ["nTopology"],
      "sources": {
        "perplexity": true,
        "exaDeep": false,
        "serpNews": false,
        "serpLinkedin": false,
        "techDocs": true,
        "patents": false
      },
      "company_context": {
        "name": "CDS",
        "industry": "CAO/FAO"
      }
    }'
    ;;

  market)
    echo -e "${GREEN}Test: Market Analysis${NC}"
    PAYLOAD='{
      "analysis_type": "market",
      "competitors": ["nTopology", "Altair", "Siemens NX", "PTC Creo"],
      "sources": {
        "perplexity": true,
        "exaDeep": true,
        "serpNews": true,
        "serpLinkedin": false,
        "techDocs": false,
        "patents": false
      },
      "company_context": {
        "name": "CDS",
        "industry": "CAO/FAO"
      }
    }'
    ;;

  technology)
    echo -e "${GREEN}Test: Technology Analysis${NC}"
    PAYLOAD='{
      "analysis_type": "technology",
      "competitors": ["nTopology"],
      "sources": {
        "perplexity": false,
        "exaDeep": true,
        "serpNews": false,
        "serpLinkedin": false,
        "techDocs": true,
        "patents": true
      },
      "company_context": {
        "name": "CDS",
        "industry": "CAO/FAO"
      }
    }'
    ;;

  invalid)
    echo -e "${RED}Test: Invalid Payload (should return 400)${NC}"
    PAYLOAD='{
      "analysis_type": "invalid_type",
      "competitors": "not_an_array"
    }'
    ;;

  *)
    echo "Unknown test type: $TEST_TYPE"
    echo "Usage: ./test-webhook.sh [basic|competitor|product|market|technology|invalid]"
    exit 1
    ;;
esac

echo ""
echo "Payload:"
echo "$PAYLOAD" | jq .
echo ""

echo -e "${CYAN}Sending request...${NC}"
echo ""

# Send request and capture response + status
HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "$WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD")

# Extract body and status code (macOS compatible)
HTTP_STATUS=$(echo "$HTTP_RESPONSE" | tail -n 1)
HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed '$d')

echo "Status: $HTTP_STATUS"
echo ""
echo "Response:"
echo "$HTTP_BODY" | jq . 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Validate response
if [ "$HTTP_STATUS" -eq 200 ]; then
  echo -e "${GREEN}✓ Request successful${NC}"

  # Check required fields
  SUCCESS=$(echo "$HTTP_BODY" | jq -r '.success' 2>/dev/null)
  ANALYSIS_ID=$(echo "$HTTP_BODY" | jq -r '.analysis_id' 2>/dev/null)
  DURATION=$(echo "$HTTP_BODY" | jq -r '.estimated_duration' 2>/dev/null)

  if [ "$SUCCESS" = "true" ]; then
    echo -e "${GREEN}✓ success: true${NC}"
  else
    echo -e "${RED}✗ success should be true${NC}"
  fi

  if [[ "$ANALYSIS_ID" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$ ]]; then
    echo -e "${GREEN}✓ analysis_id is valid UUID: $ANALYSIS_ID${NC}"
  else
    echo -e "${RED}✗ analysis_id is not valid UUID: $ANALYSIS_ID${NC}"
  fi

  if [ "$DURATION" = "120" ]; then
    echo -e "${GREEN}✓ estimated_duration: 120${NC}"
  else
    echo -e "${RED}✗ estimated_duration should be 120, got: $DURATION${NC}"
  fi

elif [ "$HTTP_STATUS" -eq 400 ] && [ "$TEST_TYPE" = "invalid" ]; then
  echo -e "${GREEN}✓ Correctly rejected invalid payload${NC}"
else
  echo -e "${RED}✗ Unexpected status: $HTTP_STATUS${NC}"
fi

echo ""
echo -e "${CYAN}=== Test Complete ===${NC}"
