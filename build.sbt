import com.typesafe.config._

name := "delphi-management"

organization := "de.upb"


version := "0.9.0"


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
val appPortManagement    = conf.getString("app.portManagement")

PlayKeys.devSettings := Seq(
    "play.server.http.port" -> appPortManagement
)
pipelineStages := Seq(digest,gzip)

resolvers += Resolver.sonatypeRepo("snapshots")
resolvers += Resolver.jcenterRepo

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.1"
libraryDependencies += "com.iheart" %% "ficus" % "1.4.3"
libraryDependencies += "org.webjars" % "bootstrap" % "4.1.0"
libraryDependencies += "org.webjars" %% "webjars-play" % "2.6.3"
libraryDependencies += "com.adrianhurt" %% "play-bootstrap" % "1.4-P26-B4-SNAPSHOT"
libraryDependencies += "eu.bitwalker" % "UserAgentUtils" % "1.20"
libraryDependencies += "com.typesafe.akka" %% "akka-http" % "10.1.5"
libraryDependencies += "com.typesafe.akka" %% "akka-stream" % "2.5.14"
libraryDependencies += "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.5"
libraryDependencies += ws

routesGenerator := InjectedRoutesGenerator

// Pinning secure versions of insecure transitive libraryDependencies
// Please update when updating dependencies above (including Play plugin)
libraryDependencies ++= Seq(
  "com.nimbusds" % "nimbus-jose-jwt" % "5.14",
  "org.bouncycastle" % "bcprov-jdk15on" % "1.60",
  "com.google.guava" % "guava" % "25.1-jre",
  "org.apache.commons" % "commons-compress" % "1.16"
)

libraryDependencies += "com.pauldijou" %% "jwt-core" % "1.0.0"
