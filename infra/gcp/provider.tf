terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    dynatrace = {
      source  = "dynatrace-oss/dynatrace"
      version = "~> 1.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

provider "dynatrace" {
  dt_env_url   = var.dynatrace_env_url
  dt_api_token = var.dynatrace_api_token
}
