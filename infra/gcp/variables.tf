variable "gcp_project_id" {
  description = "Google Cloud project ID"
  type        = string
  default     = "bruce-499005"
}

variable "gcp_region" {
  description = "GCP region for deployments"
  type        = string
  default     = "us-central1"
}

variable "dynatrace_env_url" {
  description = "Dynatrace Environment URL"
  type        = string
  default     = "https://ens66072.live.dynatrace.com"
}

variable "dynatrace_api_token" {
  description = "Dynatrace API Token"
  type        = string
  sensitive   = true
}

variable "gemini_api_key" {
  description = "Google Gemini API Key"
  type        = string
  sensitive   = true
}
