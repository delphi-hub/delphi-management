package controllers

import akka.actor.ActorSystem
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.concurrent.CustomExecutionContext
import play.api.mvc.{ControllerComponents, BaseController, Action, AnyContent}

trait MyExecutionContext extends ExecutionContext

class MyExecutionContextImpl @Inject()(system: ActorSystem)
  extends CustomExecutionContext(system, "my.executor") with MyExecutionContext

class InstanceRegistryController @Inject()(myExecutionContext: MyExecutionContext,
                                           val controllerComponents: ControllerComponents)
  extends BaseController {

  def numberOfCrawlers: Action[AnyContent] = Action.async {
    Future {
      // Call some blocking API
      Ok("result of blocking call")
    }(myExecutionContext)
  }
}
