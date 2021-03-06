import com.typesafe.config._

name := "delphi-management"

organization := "de.upb"


version := "1.0.1"


scalaVersion := "2.12.4"

lazy val management = (project in file(".")).enablePlugins(SbtWeb).enablePlugins(PlayScala)
  .enablePlugins(BuildInfoPlugin).
  settings(
    buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion),
    buildInfoPackage := "de.upb.cs.swt.delphi.management",
    (scalastyleSources in Compile) := {
      // all .scala files in "src/main/scala"
      val scalaSourceFiles = ((scalaSource in Compile).value ** "*.scala").get
      val fSep = java.io.File.separator // "/" or "\"
      val dirNameToExclude = "app" + fSep + "models" // "com/folder_to_exclude"
      scalaSourceFiles.filterNot(_.getAbsolutePath.contains(dirNameToExclude))
    }
  )

scalastyleConfig := baseDirectory.value / "project" / "scalastyle-config.xml"

val conf = ConfigFactory.parseFile(new File("conf/application.conf")).resolve()
val appPortManagement = conf.getString("app.portManagement")

PlayKeys.devSettings := Seq(
  "play.server.http.port" -> appPortManagement
)
pipelineStages := Seq(digest, gzip)

resolvers += Resolver.sonatypeRepo("snapshots")
resolvers += Resolver.jcenterRepo

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.1"
libraryDependencies += "com.iheart" %% "ficus" % "1.4.3"
libraryDependencies += "org.webjars" % "bootstrap" % "4.3.1" exclude("org.webjars", "jquery")
//Snyk vulnerability
libraryDependencies += "org.webjars" % "jquery" % "3.4.0"
libraryDependencies += "org.webjars" %% "webjars-play" % "2.7.3" exclude("com.fasterxml.jackson.core", "jackson-databind")
//Snyk vulnerability high severity
libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.9.10.1"
libraryDependencies += "com.adrianhurt" %% "play-bootstrap" % "1.5-P27-B3" exclude ("com.fasterxml.jackson.datatype","jackson-datatype-jsr310")
libraryDependencies += "com.fasterxml.jackson.datatype" % "jackson-datatype-jsr310" % "2.9.8"
libraryDependencies += "eu.bitwalker" % "UserAgentUtils" % "1.20"
libraryDependencies += "com.typesafe.akka" %% "akka-http" % "10.1.10"
libraryDependencies += "com.typesafe.akka" %% "akka-stream" % "2.5.16"
libraryDependencies += "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.6"
libraryDependencies += ws

routesGenerator := InjectedRoutesGenerator

// Pinning secure versions of insecure transitive libraryDependencies
// Please update when updating dependencies above (including Play plugin)
libraryDependencies ++= Seq(
  "com.nimbusds" % "nimbus-jose-jwt" % "5.14",
  "org.bouncycastle" % "bcprov-jdk15on" % "1.60",
  "com.google.guava" % "guava" % "25.1-jre",
  "org.apache.commons" % "commons-compress" % "1.19"
)

libraryDependencies += "com.pauldijou" %% "jwt-core" % "1.0.0"
