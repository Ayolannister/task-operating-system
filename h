[1mdiff --git a/aks-infra/main.tf b/aks-infra/main.tf[m
[1mindex fb37a85..3eb8500 100644[m
[1m--- a/aks-infra/main.tf[m
[1m+++ b/aks-infra/main.tf[m
[36m@@ -12,14 +12,14 @@[m [mterraform {[m
     container_name       = "terraform-state"[m
     key                  = "terraform.tfstate"[m
   }[m
[31m- }[m
[32m+[m[32m}[m
 [m
 provider "azurerm" {[m
   subscription_id = "4d2f3d90-3f7a-4f44-bb7f-bee999a3638b"[m
[31m-  [m
[32m+[m
   features {}[m
 [m
[31m-  [m
[32m+[m
 }[m
 [m
 resource "azurerm_resource_group" "task" {[m
[36m@@ -35,12 +35,12 @@[m [mresource "azurerm_resource_group" "task" {[m
 #   dns_prefix          = "taskaks"[m
 # }[m
 module "aks" {[m
[31m-  source    = "Azure/avm-res-containerservice-managedcluster/azurerm"[m
[31m-  location  = azurerm_resource_group.task.location[m
[31m-  name      = "demo"[m
[31m-  parent_id = azurerm_resource_group.task.id[m
[32m+[m[32m  source     = "Azure/avm-res-containerservice-managedcluster/azurerm"[m
[32m+[m[32m  location   = azurerm_resource_group.task.location[m
[32m+[m[32m  name       = "demo"[m
[32m+[m[32m  parent_id  = azurerm_resource_group.task.id[m
   dns_prefix = "taskaks"[m
[31m-  [m
 [m
[31m-  [m
[32m+[m
[32m+[m
 }[m
[1mdiff --git a/aks-infra/modules/aks b/aks-infra/modules/aks[m
[1m--- a/aks-infra/modules/aks[m
[1m+++ b/aks-infra/modules/aks[m
[36m@@ -1 +1 @@[m
[31m-Subproject commit 5615984973395b59ea1ac5630cdea80b3a0dd73a[m
[32m+[m[32mSubproject commit 5615984973395b59ea1ac5630cdea80b3a0dd73a-dirty[m
