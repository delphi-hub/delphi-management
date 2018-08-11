package controllers

import java.net.InetAddress
import play.core.PlayVersion

  object JavaVersion {
  def apply(javaVersionPrefix: Option[String]): String = {
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
}

object HostName {
  def apply(host: Option[String]): String = {    
   var hostname = InetAddress.getLocalHost().getHostName()
   hostname
  }
}

object PlatformName {
  def apply(platform: Option[String]): String = {
    var os = "os.name";
    var version = "os.version";
    var osVersion = System.getProperty(os) + " " + System.getProperty(version)
    osVersion
  }
}

object ScalaVersion {
  def apply(browser: Option[String]): String = {
    var scalaVersion = PlayVersion.current
    scalaVersion
  }
}