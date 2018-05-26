/** Use with a default value, for example:
 *  runningScalaVersion getOrElse "2.8.0"
 */

class GetVersion { 
	lazy val runningScalaVersion = {
	  val matcher = """version (\d+\.\d+\.\d+).*""".r
	  util.Properties.versionString match {
	    case matcher(versionString) => Some(versionString)
	    case _ => None
	  }
}



}



/*def getRunningScalaVersion(): String = {
  try {
    //OLD WAY
    //val stream = getClass.getResourceAsStream("/library.properties")
    //val iter = scala.io.Source.fromInputStream(stream).getLines
    //val line = (iter find {l => l.startsWith("version.number")}).get
    //val Version = """version\.number=(\d\.\d\.\d).*""".r

    //stainsby's way
    val props = new java.util.Properties
    props.load(getClass.getResourceAsStream("/library.properties"))
    val line = props.getProperty("version.number")
    val Version = """(\d\.\d\.\d).*""".r
    val Version(versionStr) = line
    versionStr
  }
  catch {
    case e => {
      e.printStackTrace()
      "2.8.0" //or some other default version, or re-raise
    }
  }
}*/