// package controllers

// import javax.inject.Inject

// import scala.concurrent.Future
// import scala.concurrent.duration.FiniteDuration
// import net.ceedubs.ficus.Ficus.{finiteDurationReader, toFicusConfig, optionValueReader}
// import com.mohiva.play.silhouette.api.Authenticator.Implicits.RichDateTime
// import com.mohiva.play.silhouette.api.{Environment, Silhouette}
// import com.mohiva.play.silhouette.api.exceptions.ProviderException
// import com.mohiva.play.silhouette.api.util.Credentials
// import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
// import play.api.Configuration
// import play.api.data.Form
// import play.api.data.Forms.{boolean, email, mapping, nonEmptyText}
// import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
// import play.api.i18n.{I18nSupport, Messages, MessagesApi}
// import scala.concurrent.ExecutionContext.Implicits.global
// import services.UserService
// import org.joda.time.DateTime
// import AuthForms.SignInForm
// import utils.auth.DefaultEnv

// /**
//   * Form used to store the three input variables when logging in: E-Mail, Password, RememberMe
//   */
// object AuthForms {

//   case class SignInData(email:String, password:String, rememberMe:Boolean)
//   val SignInForm = Form(mapping(
//     "email" -> email,
//     "password" -> nonEmptyText,
//     "rememberMe" -> boolean
//   )(SignInData.apply)(SignInData.unapply)
//   )

// }

// /**
//   * Controller handling authentification related GET requests
//   *
//   * @param messagesApi Injected handle of current play MessagesApi
//   * @param env Injected handle of current silhouette Environment
//   * @param credentialsProvider Injected handle of the CredetialsProvider
//   * @param userService Injected handle of the current UserService (defined in services/UserService.scala, bound in Module.scala)
//   * @param configuration Injected handle of current application configuration
//   * @param cc Injected handle of current ControllerComponents, needed to extend superclass AbstractController
//   * @param silhouette Injected handle of current silhouette instance
//   */
// class AuthController @Inject() (
//                        override val messagesApi:MessagesApi,
//                        val env:Environment[DefaultEnv],
//                        credentialsProvider: CredentialsProvider,
//                        userService: UserService,
//                        configuration: Configuration,
//                        cc: ControllerComponents,
//                        silhouette: Silhouette[DefaultEnv]) extends AbstractController(cc) with I18nSupport{



//   /**
//     * Called on GET /auth/signIn, will show the signIn page. If the user already is logged on, he will be redirected to
//     * the index page
//     *
//     * @return Action redirecting the user
//     */
//   def signIn: Action[AnyContent] = silhouette.UserAwareAction.async { implicit request =>
//     Future.successful(request.identity match {
//       case Some(_) => Redirect(routes.HomeController.index())
//       case None => Ok(views.html.auth.signIn(SignInForm))
//     })
//   }

//   /**
//     * Called when the user hits Enter / Login-Button on the login-page. Validates login data from the Form defined above
//     * and redirects the user to the index page if supplied credentials are valid. Handles any error during login.
//     *
//     * @return Corrsponding action
//     */
//   def authenticate : Action[AnyContent] = Action.async { implicit request =>
//     SignInForm.bindFromRequest.fold(
//       bogusForm => Future.successful(BadRequest(views.html.auth.signIn(bogusForm))),
//       signInData => {
//         val credentials = Credentials(signInData.email, signInData.password)
//         credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
//           userService.retrieve(loginInfo).flatMap {
//             case None =>
//               Future.successful(Redirect(routes.AuthController.signIn()).flashing("error" -> Messages("error.noUser")))
//             case Some(user) if !user.profileFor(loginInfo).exists(_.confirmed) =>
//               Future.successful(Redirect(routes.AuthController.signIn()).flashing("error" -> Messages("error.unregistered", signInData.email)))
//             case Some(_) => for {
//               authenticator <- env.authenticatorService.create(loginInfo).map {
//                 case authenticator:Any if signInData.rememberMe =>
//                   val c = configuration.underlying
//                   authenticator.copy(
//                     expirationDateTime = new DateTime() + c.as[FiniteDuration]("silhouette.authenticator.rememberMe.authenticatorExpiry"),
//                     idleTimeout = c.getAs[FiniteDuration]("silhouette.authenticator.rememberMe.authenticatorIdleTimeout"),
//                     cookieMaxAge = c.getAs[FiniteDuration]("silhouette.authenticator.rememberMe.cookieMaxAge")
//                   )
//                 case authenticator:Any => authenticator
//               }
//               value <- env.authenticatorService.init(authenticator)
//               result <- env.authenticatorService.embed(value, Redirect(routes.HomeController.index()))
//             } yield result
//           }
//         }.recover {
//           case _:ProviderException => Redirect(routes.AuthController.signIn()).flashing("error" -> Messages("error.invalidCredentials"))
//         }
//       }
//     )
//   }

//   /**
//     * Called when signing out. Deletes the cookie that marked the user as logged in, and redirects him to the index page, which
//     * will again redirect him to the signin page
//     *
//     * @return Action redirecting the user
//     */
//   def signOut : Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
//     env.authenticatorService.discard(request.authenticator, Redirect(routes.HomeController.index()))
//   }






// }
