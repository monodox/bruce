variable "gcp_project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "gcp_region" {
  description = "The region to deploy resources to"
  type        = string
  default     = "us-central1"
}

variable "dynatrace_env_url" {
  description = "Dynatrace Environment URL (e.g., https://abc12345.live.dynatrace.com)"
  type        = string
}

variable "dynatrace_api_token" {
  description = "Dynatrace API Token with necessary permissions"
  type        = string
  sensitive   = true
}
