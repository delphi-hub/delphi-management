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
    val hostname = InetAddress.getLocalHost().getHostName()
    hostname
   }
 }

 object PlatformName {
   def apply(platform: Option[String]): String = {
     val os = "os.name";
     val version = "os.version";
     val osVersion = System.getProperty(os) + " " + System.getProperty(version)
     osVersion
   }
 }

 object ScalaVersion {
   def apply(browser: Option[String]): String = {
     val scalaVersion = PlayVersion.current
     scalaVersion
   }
 }