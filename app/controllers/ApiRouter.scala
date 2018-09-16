package controllers

import javax.inject.Inject
import play.api.routing.Router.Routes
import play.api.routing.SimpleRouter
import play.api.routing.sird._

/**
  * Router used to manage access to all available API
  * Endpoints.
  * @param controller Controller components reference
  */
class ApiRouter @Inject()(controller: InstanceRegistryController)
  extends SimpleRouter
{

  override def routes: Routes = {
    case GET(p"/numberOfInstances" ? q"componentType=$componentType") => controller.numberOfInstances(componentType)
    case GET(p"/instances" ? q"componentType=$componentType") => controller.instances(componentType)
  }
}