import com.typesafe.config._

name := "delphi-management"

organization := "de.upb"

version := "1.0.0-SNAPSHOT"

scalaVersion := "2.12.4"

lazy val management = (project in file(".")).enablePlugins(SbtWeb).enablePlugins(PlayScala)
                                      .enablePlugins(BuildInfoPlugin).
                                        settings(
                                          buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion),
                                          buildInfoPackage := "de.upb.cs.swt.delphi.management"
                                        )
                                        
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
libraryDependencies += "com.h2database" % "h2" % "1.4.196"
libraryDependencies += "com.mohiva" %% "play-silhouette" % "5.0.5"
libraryDependencies += "com.mohiva" %% "play-silhouette-persistence" % "5.0.5"
libraryDependencies += "com.mohiva" %% "play-silhouette-crypto-jca" % "5.0.5"
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.1"
libraryDependencies += "com.iheart" %% "ficus" % "1.4.3"
libraryDependencies += "com.mohiva" %% "play-silhouette-password-bcrypt" % "5.0.5"
libraryDependencies += "org.webjars" % "bootstrap" % "4.1.0"
libraryDependencies += "org.webjars" %% "webjars-play" % "2.6.3"
libraryDependencies += "com.adrianhurt" %% "play-bootstrap" % "1.4-P26-B4-SNAPSHOT"
libraryDependencies += "eu.bitwalker" % "UserAgentUtils" % "1.20"
libraryDependencies += "com.typesafe.akka" %% "akka-http-spray-json" % "10.0.8"
libraryDependencies += ws

routesGenerator := InjectedRoutesGenerator
