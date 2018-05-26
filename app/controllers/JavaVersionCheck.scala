package controllers

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
}