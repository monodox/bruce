# Infrastructure

Infrastructure as Code for deploying Bruce to Google Cloud Platform.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Google Cloud (bruce-499005, us-central1)                     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Cloud Run   │  │  Cloud Run   │  │   Cloud Run      │  │
│  │  Frontend    │  │  Backend     │  │   MCP Server     │  │
│  │  :3000       │  │  :8080       │  │   (stdio→http)   │  │
│  └──────────────┘  └──────┬───────┘  └────────┬─────────┘  │
│                           │                    │            │
│                           ▼                    ▼            │
│                    ┌──────────────┐    ┌──────────────────┐ │
│                    │  Firestore   │    │  Dynatrace API   │ │
│                    │  (playbooks) │    │  (ens66072)      │ │
│                    └──────────────┘    └──────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Agent Builder (Gemini 3.5 Flash)                     │   │
│  │  System instructions → MCP tools → Playbook output   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ▲
         │ OTLP (traces, metrics, logs)
         │
┌────────┴─────────────────────────────────────┐
│  Bindplane / OTel Collector                   │
│  Receives telemetry from AI agents in prod   │
└──────────────────────────────────────────────┘
```

## Directories

| Directory | Contents |
|-----------|----------|
| `gcp/` | Terraform: Cloud Run services, Firestore, IAM |
| `bindplane/` | OpenTelemetry collector pipeline + K8s agent manifests |
| `dynatrace/` | Exported dashboard JSON configs |

## Quick Start

```bash
cd infra/gcp
terraform init
terraform plan
terraform apply
```

## Environment

| Resource | Value |
|----------|-------|
| GCP Project | bruce-499005 |
| Region | us-central1 |
| Dynatrace | https://ens66072.live.dynatrace.com |
| Frontend | https://bruce-frontend-200902967092.us-central1.run.app |
