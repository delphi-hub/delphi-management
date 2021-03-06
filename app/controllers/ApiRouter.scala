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

import javax.inject.Inject
import play.api.routing.Router.Routes
import play.api.routing.SimpleRouter
import play.api.routing.sird._

/**
  * Router used to manage access to all available API
  * Endpoints.
  * @param controller Controller components reference
  */
class ApiRouter @Inject()(irController: InstanceRegistryController, sysController: SystemInfoController)
  extends SimpleRouter
{

  override def routes: Routes = {
    case GET(p"/numberOfInstances" ? q"componentType=$componentType") => irController.numberOfInstances(componentType)
    case GET(p"/instances" ? q"componentType=$componentType") => irController.instances(componentType)
    case GET(p"/systemInfo") => sysController.getInfo()
    case GET(p"/network") => irController.getNetwork()
    case GET(p"/users") => irController.users()
    case POST(p"/postInstance" ? q"componentType=$componentType"& q"name=$name") => irController.postInstance(componentType, name)
    case POST(p"/startInstance" ? q"instanceID=$instanceID") => irController.handleRequest(action="/start", instanceID)
    case POST(p"/stopInstance" ? q"instanceID=$instanceID") => irController.handleRequest(action="/stop", instanceID)
    case POST(p"/pauseInstance" ? q"instanceID=$instanceID") => irController.handleRequest(action="/pause", instanceID)
    case POST(p"/resumeInstance" ? q"instanceID=$instanceID") => irController.handleRequest(action="/resume", instanceID)
    case POST(p"/deleteInstance" ? q"instanceID=$instanceID") => irController.handleRequest(action="/delete", instanceID)
    case POST(p"/reconnectInstance" ? q"from=$from"& q"to=$to") => irController.reconnect(from.toInt, to.toInt)
    case POST(p"/authenticate") => irController.authentication()
    case POST(p"/labelInstance" ? q"instanceID=$instanceID"& q"label=$label") => irController.labelInstance(instanceID, label)
    case POST(p"/postUser") => irController.postUser()
    case POST(p"/deleteUser" ? q"userID=$userID") => irController.deleteUser(userID)
    case POST(p"/deleteLabel" ? q"instanceID=$instanceID"& q"label=$label") => irController.deleteLabel(instanceID, label)
  }
}
