output "rg_name" {
  description = "The name of the resource group"
  value       = azurerm_resource_group.task.name
}
output "aks_name" {
  description = "The name of the AKS cluster"
  value       = module.aks.name
}
# output "rg_name" {
#   description = "The name of the resource group"
#   value       = module.aks.rg_name
# }