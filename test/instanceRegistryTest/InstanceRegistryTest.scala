package instanceRegistryTest

import org.scalatest.FlatSpec
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play.components.OneAppPerSuiteWithComponents
import play.api.mvc.{Result, Results}
import play.api.test.{FakeRequest, Helpers}
import play.api.test.Helpers.{GET, route}

import scala.concurrent.Future

class InstanceRegistryTest extends FlatSpec with MockitoSugar with Results with OneAppPerSuiteWithComponents {
  "respond to the index Action" should "" in {

    val Some(result): Option[Future[Result]] = route(app, FakeRequest(GET, "/api/numberOfInstances?componentType=Crawler"))
    print(result)

  }
}
