package controllers

import akka.actor.ActorSystem
import io.swagger.annotations.{ApiResponse, ApiResponses, ApiParam}
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.{WSClient, WSResponse}
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

  @ApiResponses(Array(
    new ApiResponse(code = 400, message = "Invalid ComponentType supplied"),
    new ApiResponse(code = 404, message = "Component not found")))
  def numberOfInstances( @ApiParam(value = "ComponentType to fetch the number of instances for") componentType: String) : Action[AnyContent] = Action.async {
    ws.url("http://localhost:8087/numberOfInstances").addQueryStringParameters("ComponentType" -> "Crawler").get().map { response =>
      // TODO: possible handling of parsing the data can be done here
      Ok(response.body)
    }(myExecutionContext)
  }

}