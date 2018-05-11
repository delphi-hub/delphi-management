package utils

import com.mohiva.play.silhouette.api.actions.SecuredErrorHandler
import javax.inject.Inject
import play.api.http.DefaultHttpErrorHandler
import play.api.i18n._
import play.api.mvc.Results._
import play.api.mvc.{RequestHeader, Result}

import scala.concurrent.Future
import controllers.routes

class MyErrorHandler @Inject() (
                               val messagesApi: MessagesApi)
  extends DefaultHttpErrorHandler with SecuredErrorHandler
    with I18nSupport  {

  implicit val messages = MessagesImpl(Lang("en"), messagesApi)

  override def onNotAuthenticated(implicit request: RequestHeader): Future[Result] =
    Future.successful(Redirect(routes.Auth.signIn()))

  override def onNotAuthorized(implicit request: RequestHeader): Future[Result] =
    Future.successful(Redirect(routes.Auth.signIn()).flashing("error" -> Messages("error.accessDenied")))

  override def onNotFound(request: RequestHeader, message: String): Future[Result] =
    Future.successful(Ok(views.html.errors.notFound(request)))

  override def onServerError(request:RequestHeader, exception:Throwable):Future[Result] =
    Future.successful(Ok(views.html.errors.serverError(request, exception)))








}