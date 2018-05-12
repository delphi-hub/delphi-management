package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc._
import utils.auth.DefaultEnv
import utils.MyErrorHandler

/**
  * Controller handling GET requests for the index page
  *
  * @param messageApi Injected handle of current play MessagesApi
  * @param cc Injected handle of ControllerComponents, needed to extend superclass AbstractController
  * @param silhouette Injected handle of current Silhouette instance
  */
@Singleton
class HomeController @Inject()(messageApi: MessagesApi,cc: ControllerComponents, silhouette: Silhouette[DefaultEnv]) extends AbstractController(cc) with I18nSupport{

  /**
    * Create a SecuredAction to render the index page when receiving GET with path '/'. If the user is not logged in,
    * the passed instance of MyErrorHandler will redirect him to the login page.
    */
  def index = silhouette.SecuredAction(new MyErrorHandler(messageApi))  { implicit request =>
    Ok(views.html.index(Option(request.identity), Option(request.authenticator.loginInfo)))
  }

}
