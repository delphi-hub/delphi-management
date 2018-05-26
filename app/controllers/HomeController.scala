package controllers

import controllers.JavaVersionCheck.apply
import javax.inject._
import play.api.mvc._
//import com.typesafe.sbt._
/**
  * Created by benhermann on 02.01.18.
  */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
    * Create an Action to render an HTML page with a welcome message.
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index = Action {
    //var myValue = "1.7";
    //var javaVersion = new JavaVersionCheckPlugin.JavaVersionCheck(Option(myValue));
    lazy val javaVersion = apply(_)
    //val opt = Some("1.7")
    //var javaVersion = apply(opt)
    Ok(views.html.index("Delphi - Management Interface", javaVersion))
  }

  
}
/*
object JavaVersionCheck {
    def apply(javaVersionPrefix: Option[String]): String = {
    //def apply(: String = {
        val version = sys.props.get("java.version") getOrElse {sys.error("failed to get system property java.version")}

      javaVersionPrefix match {
        case Some(prefix) =>
          if (!version.startsWith(prefix)) {
            sys.error(s"javac version ${version} may not be used to publish, it has to start with ${prefix} due to javaVersionPrefix setting")
          }
        case None =>
      }
      version
  }
} */