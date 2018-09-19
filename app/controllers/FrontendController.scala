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

import javax.inject._

import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.Configuration
import play.api.http.HttpErrorHandler
import play.api.mvc._

/**
  * Frontend controller managing all static resource associate routes.
  * @param assets Assets controller reference.
  * @param cc Controller components reference.
  */
@Singleton
class FrontendController @Inject()(assets: Assets, errorHandler: HttpErrorHandler, config: Configuration, cc: ControllerComponents)
  extends AbstractController(cc) with I18nSupport {

  def index: Action[AnyContent] = assets.at("index.html")

  def assetOrDefault(resource: String): Action[AnyContent] =
    if (resource.contains(".")) assets.at(resource) else index

}