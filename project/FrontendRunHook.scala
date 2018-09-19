/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// import java.net.InetSocketAddress

// import play.sbt.PlayRunHook
// import sbt._

// import scala.sys.process.Process

// /**
//   * Frontend build play run hook.
//   * https://www.playframework.com/documentation/2.6.x/SBTCookbook
//   */
// object FrontendRunHook {
//   def apply(base: File): PlayRunHook = {
//     object UIBuildHook extends PlayRunHook {

//       var process: Option[Process] = None

//       /**
//         * Change these commands if you want to use Yarn.
//         */
//       var npmInstall: String = FrontendCommands.dependencyInstall
//       var npmRun: String = FrontendCommands.serve

//       // Windows requires npm commands prefixed with cmd /c
//       if (System.getProperty("os.name").toLowerCase().contains("win")){
//         npmInstall = "cmd /c" + npmInstall
//         npmRun = "cmd /c" + npmRun
//       }

//       /**
//         * Executed before play run start.
//         * Run npm install if node modules are not installed.
//         */
//       override def beforeStarted(): Unit = {
//         if (!(base / "client" / "node_modules").exists()) Process(npmInstall, base / "client").!
//       }

//       /**
//         * Executed after play run start.
//         * Run npm start
//         */
//       override def afterStarted(addr: InetSocketAddress): Unit = {
//         process = Option(
//           Process(npmRun, base / "client").run
//         )
//       }

//       /**
//         * Executed after play run stop.
//         * Cleanup frontend execution processes.
//         */
//       override def afterStopped(): Unit = {
//         process.foreach(_.destroy())
//         process = None
//       }

//     }

//     UIBuildHook
//   }
// }