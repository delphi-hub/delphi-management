package utils

import javax.inject.Inject

import scala.concurrent.Future

import play.api._
import play.api.i18n.{I18nSupport,Messages,MessagesApi}
import play.api.mvc._, Results.Ok
import play.api.http.HttpFilters
import play.filters.csrf.CSRFFilter

//import controllers.routes

// If we configure play.http.forwarded.trustedProxies correctly, we don't need this filter... right? right!?
/*
class TrustXForwardedFilter extends Filter {
  def apply(nextFilter:RequestHeader => Future[Result])(request:RequestHeader):Future[Result] = {
    val newRequest = request.headers.get("X-Forwarded-Proto").collect {
       case "https" => request.copy(secure=true)
    }.getOrElse(request)
    nextFilter(newRequest)
  }
} 
*/

/**
 * There's no way (that I know) to turn off http in Bluemix, hence this filter.
 * Enable in production with application.proxy.httpsOnly=true.

class HttpsOnlyFilter @Inject() (val messagesApi:MessagesApi) extends Filter with I18nSupport {
  def apply(nextFilter:RequestHeader => Future[Result])(request:RequestHeader):Future[Result] = {
    implicit val r = request
    request.headers.get("X-Forwarded-Proto").map {
      case "https" => nextFilter(request)
      case _ => Future.successful(Ok(views.html.errors.onlyHttpsAllowed()))
    }.getOrElse(nextFilter(request))
  }
}

class Filters @Inject() (
    configuration:Configuration, 
    csrfFilter:CSRFFilter, 
    httpsOnlyFilter:HttpsOnlyFilter) extends HttpFilters {
  
  val map = Map("application.proxy.httpsOnly" -> httpsOnlyFilter)
  override def filters = csrfFilter +: map.foldRight[Seq[EssentialFilter]](Seq.empty) { case ((k,f),filters) => 
    configuration.getBoolean(k) collect {
      case true => f +: filters
    } getOrElse filters
  }
}*/
