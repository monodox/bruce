#!/bin/bash
# Deploy Bruce Frontend to Google Cloud Run
# Usage: ./scripts/deploy-frontend.sh

set -e

PROJECT_ID="bruce-499005"
REGION="us-central1"
SERVICE_NAME="bruce-frontend"
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "Building and deploying Bruce Frontend to Cloud Run..."

# Build and push container image
gcloud builds submit \
  --tag "${IMAGE}" \
  --project "${PROJECT_ID}" \
  --dockerfile frontend/Dockerfile \
  .

# Deploy to Cloud Run
gcloud run deploy "${SERVICE_NAME}" \
  --image "${IMAGE}" \
  --platform managed \
  --region "${REGION}" \
  --project "${PROJECT_ID}" \
  --port 3000 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_APP_NAME=Bruce,NEXT_PUBLIC_API_URL=https://bruce-backend-${PROJECT_ID}.${REGION}.run.app/api"

echo "Deployed! Getting service URL..."
gcloud run services describe "${SERVICE_NAME}" \
  --platform managed \
  --region "${REGION}" \
  --project "${PROJECT_ID}" \
  --format "value(status.url)"
