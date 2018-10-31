import akka.http.scaladsl._
import scala.concurrent._


object Stock {
def sendRequest(request: HttpRequest): Future[HttpResponse]
}