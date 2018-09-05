package controllers

import akka.actor.ActorSystem
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

trait MyExecutionContext extends ExecutionContext

class MyExecutionContextImpl @Inject()(system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

class InstanceRegistryController @Inject()(myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents,
                                           ws: WSClient)
  extends BaseController {

  def numberOfCrawlers: Action[AnyContent] = Action.async {
    ws.url("http://localhost:8084/api/crawlers/numbers").get().map { response =>
      Ok(response.body)
    }(myExecutionContext)
  }
}
