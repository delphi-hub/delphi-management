package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc._
import utils.auth.DefaultEnv
import utils.MyErrorHandler

/**
  * Created by benhermann on 02.01.18.
  */
@Singleton
class HomeController @Inject()(messageApi: MessagesApi,cc: ControllerComponents, silhouette: Silhouette[DefaultEnv]) extends AbstractController(cc) with I18nSupport{

  /**
    * Create an Action to render an HTML page with a welcome message.
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index = silhouette.SecuredAction(new MyErrorHandler(messageApi))  { implicit request =>
    Ok(views.html.index(Option(request.identity), Option(request.authenticator.loginInfo)))
  }

}
