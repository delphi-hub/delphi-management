package controllers

import akka.actor.ActorSystem
import javax.inject.Inject

import scala.concurrent.{ExecutionContext}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.{WSClient}
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

trait MyExecutionContext extends ExecutionContext

/**
  * Custom execution context. Used to prevent overflowing of the thread pool,
  * which should be used to handle client connections.
  * @param system
  */
class MyExecutionContextImpl @Inject()(system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

/**
  * Controller used to manage the requests regarding the instance registry.
  * @param myExecutionContext
  * @param controllerComponents
  * @param ws
  */
class InstanceRegistryController @Inject()(myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents,
                                           ws: WSClient)
  extends BaseController {

  def instances(componentType: String): Action[AnyContent] = Action.async {
    ws.url("http://localhost:8087/instances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here

      Ok(response.body)
    }(myExecutionContext)
  }

  def numberOfInstances(componentType: String) : Action[AnyContent] = Action.async {
    // TODO: handle what should happen if the instance registry is not reachable.
    // TODO: create constants for the urls
    ws.url("http://localhost:8087/numberOfInstances").addQueryStringParameters("ComponentType" -> componentType).get().map { response =>
      // TODO: possible handling of parsing the data can be done here
      if (response.status == 200) {
        Ok(response.body)
      } else {
        new Status(response.status)
      }
    }(myExecutionContext)
  }

}