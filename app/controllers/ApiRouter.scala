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
    case POST(p"/postInstance") => irController.postInstance()
    case POST(p"/startInstance") => irController.startInstance()
    case POST(p"/stopInstance") => irController.stopInstance()
    case POST(p"/pauseInstance") => irController.pauseInstance()
    case POST(p"/deleteInstance") => irController.deleteInstance()

  }
}