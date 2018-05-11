package controllers

import java.util.UUID

import javax.inject.Inject

import scala.concurrent.Future
import scala.concurrent.duration._
import net.ceedubs.ficus.Ficus._
import com.mohiva.play.silhouette.api.Authenticator.Implicits._
import com.mohiva.play.silhouette.api.{Environment, LoginInfo, Silhouette}
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.util.{Credentials, PasswordHasher}
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers._
import play.api._
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc._
import play.api.i18n.{I18nSupport, Messages, MessagesApi, MessagesImpl}
import play.api.libs.concurrent.Execution.Implicits._
import models.User
import services.{UserService, UserTokenService}
import org.joda.time.DateTime
import utils.auth.DefaultEnv

object AuthForms {

  // Sign in
  case class SignInData(email:String, password:String, rememberMe:Boolean)
  val signInForm = Form(mapping(
    "email" -> email,
    "password" -> nonEmptyText,
    "rememberMe" -> boolean
  )(SignInData.apply)(SignInData.unapply)
  )

}

class Auth @Inject() (
                       override val messagesApi:MessagesApi,
                       val env:Environment[DefaultEnv],
                       credentialsProvider: CredentialsProvider,
                       userService: UserService,
                       userTokenService: UserTokenService,
                       configuration: Configuration,
                       cc: ControllerComponents,
                       silhouette: Silhouette[DefaultEnv]) extends AbstractController(cc) with I18nSupport{

  import AuthForms._


  def signUp(tokenId:String) = Action.async { implicit request =>
    val id = UUID.fromString(tokenId)
    userTokenService.find(id).flatMap {
      case None =>
        Future.successful(NotFound(views.html.errors.notFound(request)))
      case Some(token) if token.isSignUp && !token.isExpired =>
        userService.find(token.userId).flatMap {
          case None => Future.failed(new IdentityNotFoundException(Messages("error.noUser")))
          case Some(user) =>
            val loginInfo = LoginInfo(CredentialsProvider.ID, token.email)
            for {
              authenticator <- env.authenticatorService.create(loginInfo)
              value <- env.authenticatorService.init(authenticator)
              _ <- userService.confirm(loginInfo)
              _ <- userTokenService.remove(id)
              result <- env.authenticatorService.embed(value, Redirect(routes.HomeController.index()))
            } yield result
        }
      case Some(token) =>
        userTokenService.remove(id).map {_ => NotFound(views.html.errors.notFound(request))}
    }
  }

  def signIn = silhouette.UserAwareAction.async { implicit request =>
    Future.successful(request.identity match {
      case Some(user) => Redirect(routes.HomeController.index())
      case None => Ok(views.html.auth.signIn(signInForm))
    })
  }

  def authenticate = Action.async { implicit request =>
    signInForm.bindFromRequest.fold(
      bogusForm => Future.successful(BadRequest(views.html.auth.signIn(bogusForm))),
      signInData => {
        val credentials = Credentials(signInData.email, signInData.password)
        credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
          userService.retrieve(loginInfo).flatMap {
            case None =>
              Future.successful(Redirect(routes.Auth.signIn()).flashing("error" -> Messages("error.noUser")))
            case Some(user) if !user.profileFor(loginInfo).map(_.confirmed).getOrElse(false) =>
              Future.successful(Redirect(routes.Auth.signIn()).flashing("error" -> Messages("error.unregistered", signInData.email)))
            case Some(_) => for {
              authenticator <- env.authenticatorService.create(loginInfo).map {
                case authenticator if signInData.rememberMe =>
                  val c = configuration.underlying
                  authenticator.copy(
                    expirationDateTime = new DateTime() + c.as[FiniteDuration]("silhouette.authenticator.rememberMe.authenticatorExpiry"),
                    idleTimeout = c.getAs[FiniteDuration]("silhouette.authenticator.rememberMe.authenticatorIdleTimeout"),
                    cookieMaxAge = c.getAs[FiniteDuration]("silhouette.authenticator.rememberMe.cookieMaxAge")
                  )
                case authenticator => authenticator
              }
              value <- env.authenticatorService.init(authenticator)
              result <- env.authenticatorService.embed(value, Redirect(routes.HomeController.index()))
            } yield result
          }
        }.recover {
          case e:ProviderException => Redirect(routes.Auth.signIn()).flashing("error" -> Messages("error.invalidCredentials"))
        }
      }
    )
  }

  def signOut = silhouette.SecuredAction.async { implicit request =>
    env.authenticatorService.discard(request.authenticator, Redirect(routes.HomeController.index()))
  }






}
