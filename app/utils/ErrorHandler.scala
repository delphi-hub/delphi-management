package utils

import com.mohiva.play.silhouette.api.actions.SecuredErrorHandler
import javax.inject.Inject
import play.api.http.DefaultHttpErrorHandler
import play.api.i18n.{MessagesApi,I18nSupport,Messages,MessagesImpl,Lang}
import play.api.mvc.Results.{Redirect,Ok}
import play.api.mvc.{RequestHeader, Result}

import scala.concurrent.Future
import controllers.routes

/**
  * HttpErrorHandler for this application. Handles authentication issues as well as 404 / 500 errors.
  *
  * @param messagesApi Injected handle of current MessagesApi
  */
class ErrorHandler @Inject() (val messagesApi: MessagesApi)
  extends DefaultHttpErrorHandler with SecuredErrorHandler
    with I18nSupport  {

  //Implicitly define Messages Instance, needed for calling html templates
  implicit val messages : Messages = MessagesImpl(Lang("en"), messagesApi)


  override def onNotAuthenticated(implicit request: RequestHeader): Future[Result] =
    Future.successful(Redirect(routes.AuthController.signIn()))

  override def onNotAuthorized(implicit request: RequestHeader): Future[Result] =
    Future.successful(Redirect(routes.AuthController.signIn()).flashing("error" -> Messages("error.accessDenied")))

  override def onNotFound(request: RequestHeader, message: String): Future[Result] =
    Future.successful(Ok(views.html.errors.notFound(request)))

  override def onServerError(request:RequestHeader, exception:Throwable):Future[Result] =
    Future.successful(Ok(views.html.errors.serverError(request, exception)))








}