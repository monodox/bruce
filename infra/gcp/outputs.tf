output "frontend_url" {
  description = "Bruce Frontend URL"
  value       = google_cloud_run_v2_service.frontend.uri
}

output "backend_url" {
  description = "Bruce Backend URL"
  value       = google_cloud_run_v2_service.backend.uri
}

output "mcp_server_url" {
  description = "Bruce MCP Server URL"
  value       = google_cloud_run_v2_service.mcp_server.uri
}
