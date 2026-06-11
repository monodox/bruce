# Agent Builder

This directory contains configurations and prompts for the Bruce diagnostic agent running on [Google Cloud Agent Builder](https://cloud.google.com/products/agent-builder).

## Contents

- `prompts/system_instructions.md` — System instructions for the Gemini-powered diagnostic agent
- `tools/` — OpenAPI specifications for the MCP server tools
- `data-stores/` — Configs for grounding the agent in observability documentation

## Setup

### 1. Create Agent in GCP Console

1. Go to [Agent Builder Console](https://console.cloud.google.com/gen-app-builder?project=bruce-499005)
2. Create a new **Agent** app
3. Set model to **gemini-3.5-flash**
4. Paste contents of `prompts/system_instructions.md` as system instructions

### 2. Add MCP Server as Tool

The agent connects to the Bruce MCP Server deployed on Cloud Run. Add it as an OpenAPI tool:

```
Tool Name: dynatrace-observability
Endpoint: https://bruce-mcp-server-200902967092.us-central1.run.app
```

Tools available:
- `get_failing_traces` — Query error traces
- `get_token_metrics` — Query token spend
- `get_problems` — Query active anomalies
- `get_agent_health` — Query agent status

### 3. Configure Webhook Trigger

Set up a webhook in Dynatrace that fires on anomaly detection:
- URL: `https://bruce-backend-200902967092.us-central1.run.app/api/webhooks/alert`
- Method: POST
- Payload: Include alert title, severity, and details

## Architecture

```
Dynatrace Alert → Backend Webhook → Gemini Agent → MCP Tools → Dynatrace API
                                         ↓
                                    Fix Playbook → Firestore → Frontend
```

## Model

- **Model:** gemini-3.5-flash
- **Project:** bruce-499005
- **Region:** us-central1
