// The Play plugin
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.6.10")
addSbtPlugin("com.eed3si9n" % "sbt-buildinfo" % "0.7.0")

// web plugins
addSbtPlugin("com.typesafe.sbt" % "sbt-digest" % "1.1.3")
addSbtPlugin("com.typesafe.sbt" % "sbt-gzip" % "1.0.2")

resolvers += "Typesafe Repository" at "https://repo.typesafe.com/typesafe/releases/"

// coverage
addSbtPlugin("org.scoverage" % "sbt-scoverage" % "1.5.1")
addSbtPlugin("com.codacy" % "sbt-codacy-coverage" % "1.3.12")