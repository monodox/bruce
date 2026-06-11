# Cloud Run — Frontend
resource "google_cloud_run_v2_service" "frontend" {
  name     = "bruce-frontend"
  location = var.gcp_region

  template {
    containers {
      image = "gcr.io/${var.gcp_project_id}/bruce-frontend"
      ports {
        container_port = 3000
      }
      env {
        name  = "NEXT_PUBLIC_APP_NAME"
        value = "Bruce"
      }
      env {
        name  = "HOSTNAME"
        value = "0.0.0.0"
      }
    }
  }
}

# Cloud Run — Backend
resource "google_cloud_run_v2_service" "backend" {
  name     = "bruce-backend"
  location = var.gcp_region

  template {
    containers {
      image = "gcr.io/${var.gcp_project_id}/bruce-backend"
      ports {
        container_port = 8080
      }
      env {
        name  = "GOOGLE_CLOUD_PROJECT"
        value = var.gcp_project_id
      }
      env {
        name  = "GEMINI_MODEL"
        value = "gemini-3.5-flash"
      }
      env {
        name  = "DYNATRACE_ENV_URL"
        value = var.dynatrace_env_url
      }
    }
  }
}

# Cloud Run — MCP Server
resource "google_cloud_run_v2_service" "mcp_server" {
  name     = "bruce-mcp-server"
  location = var.gcp_region

  template {
    containers {
      image = "gcr.io/${var.gcp_project_id}/bruce-mcp-server"
      env {
        name  = "DYNATRACE_ENV_URL"
        value = var.dynatrace_env_url
      }
    }
  }
}

# IAM — Public access for frontend
resource "google_cloud_run_v2_service_iam_member" "frontend_public" {
  name     = google_cloud_run_v2_service.frontend.name
  location = var.gcp_region
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# IAM — Public access for backend (API)
resource "google_cloud_run_v2_service_iam_member" "backend_public" {
  name     = google_cloud_run_v2_service.backend.name
  location = var.gcp_region
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Firestore database
resource "google_firestore_database" "default" {
  project     = var.gcp_project_id
  name        = "(default)"
  location_id = var.gcp_region
  type        = "FIRESTORE_NATIVE"
}
