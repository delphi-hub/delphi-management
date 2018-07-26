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

val silhouetteVersion = "5.0.0"
libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-persistence" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-crypto-jca" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-password-bcrypt" % silhouetteVersion
)


libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.1"
libraryDependencies += "com.iheart" %% "ficus" % "1.4.3"

libraryDependencies += "org.webjars" % "bootstrap" % "4.1.0"
libraryDependencies += "org.webjars" %% "webjars-play" % "2.6.3"
libraryDependencies += "com.adrianhurt" %% "play-bootstrap" % "1.4-P26-B4-SNAPSHOT"
libraryDependencies += "eu.bitwalker" % "UserAgentUtils" % "1.20"

routesGenerator := InjectedRoutesGenerator

// Pinning secure versions of insecure transitive libraryDependencies
// Please update when updating dependencies above (including Play plugin)
libraryDependencies ++= Seq(
  "com.nimbusds" % "nimbus-jose-jwt" % "5.14",
  "org.bouncycastle" % "bcprov-jdk15on" % "1.60",
  "com.google.guava" % "guava" % "25.1-jre",
  "org.apache.commons" % "commons-compress" % "1.16"
)
