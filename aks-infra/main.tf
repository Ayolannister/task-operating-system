terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.58.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "terraformstate1780067152"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
 }

provider "azurerm" {
  subscription_id = "4d2f3d90-3f7a-4f44-bb7f-bee999a3638b"
  
  features {}
}

resource "azurerm_resource_group" "task" {
  name     = var.resource_group_name
  location = var.location
}
# module "aks" {
#   source = "./modules/aks"

#   location            = azurerm_resource_group.task.location
#   resource_group_name = azurerm_resource_group.task.name
#   name                = "demo"
#   dns_prefix          = "taskaks"
# }
module "aks" {
  source    = "Azure/avm-res-containerservice-managedcluster/azurerm"
  location  = azurerm_resource_group.task.location
  name      = "demo"
  parent_id = azurerm_resource_group.task.id
  dns_prefix = "taskaks"
  
}
