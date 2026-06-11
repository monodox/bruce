# AGENTS.md — Infrastructure

## Overview
Terraform configs for deploying Bruce to Google Cloud.

## Requirements
- Terraform >= 1.5
- gcloud CLI authenticated
- GCP project: bruce-499005

## Deploy
```bash
cd infra/gcp
terraform init
terraform plan -var="dynatrace_api_token=YOUR_TOKEN" -var="gemini_api_key=YOUR_KEY"
terraform apply -var="dynatrace_api_token=YOUR_TOKEN" -var="gemini_api_key=YOUR_KEY"
```

## Services
- Frontend: Cloud Run (port 3000)
- Backend: Cloud Run (port 8080)
- MCP Server: Cloud Run
- Storage: Firestore Native
- Telemetry: Bindplane → Dynatrace

## Bindplane
- `bindplane/pipeline.yaml` — OTel collector config routing to Dynatrace
- `bindplane/bindplane-agent.yaml` — K8s deployment for Bindplane agent

## Dynatrace
- `dynatrace/` — Exported dashboard JSON configs
