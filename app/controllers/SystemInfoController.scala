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

 package controllers

 import java.net.InetAddress

 import javax.inject.Inject
 import models.SystemInfo
 import play.api.libs.json.Json
 import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
 import play.core.PlayVersion
 import authorization.AuthAction
 import play.api.Configuration

 class SystemInfoController @Inject()(val controllerComponents: ControllerComponents, config: Configuration, authAction: AuthAction) extends BaseController {
   implicit val systemInfoWrites = Json.writes[SystemInfo]
   implicit val systemInfoReads = Json.reads[SystemInfo]

  def getInfo: Action[AnyContent] = authAction {

    val info = SystemInfo(hostName = getHostName(), javaVersion = getJvmVersion(), platformName = getPlatformName(), scalaVersion = getScalaVersion())
    val infoJson = Json.toJson(info)
    Ok(infoJson)
  }

   private def getJvmVersion(): String = {
     sys.props.get("java.version") getOrElse {
       sys.error("failed to get system property java.version")
     }
   }

    private def getHostName(): String = {
       InetAddress.getLocalHost().getHostName()
   }

   private def getPlatformName(): String = {
       val os = "os.name";
       val version = "os.version";
       val osVersion: String = System.getProperty(os) + " " + System.getProperty(version)
       osVersion
   }


   private def getScalaVersion(): String = {
       PlayVersion.current
   }

 }
