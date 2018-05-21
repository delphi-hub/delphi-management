package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject.{Inject,Singleton}
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import utils.auth.DefaultEnv
import utils.ErrorHandler

/**
  * Controller handling GET requests for the index page
  *
  * @param messageApi Injected handle of current play MessagesApi
  * @param cc Injected handle of ControllerComponents, needed to extend superclass AbstractController
  * @param silhouette Injected handle of current Silhouette instance
  */
@Singleton
class HomeController @Inject()(messageApi: MessagesApi,
                               cc: ControllerComponents,
                               silhouette: Silhouette[DefaultEnv]) extends AbstractController(cc) with I18nSupport{

  /**
    * Create a SecuredAction to render the index page when receiving GET with path '/'. If the user is not logged in,
    * the passed instance of MyErrorHandler will redirect him to the login page.
    */
  def index : Action[AnyContent] = silhouette.SecuredAction(new ErrorHandler(messageApi))  { implicit request =>
    Ok(views.html.index(Option(request.identity), Option(request.authenticator.loginInfo)))
  }

}
