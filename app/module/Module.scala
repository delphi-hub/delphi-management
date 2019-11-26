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

package module

import com.google.inject.AbstractModule
import com.typesafe.config.Config
import controllers.{MyExecutionContext, MyExecutionContextImpl}
import net.codingwell.scalaguice.ScalaModule
import play.api.mvc.Cookie
import net.ceedubs.ficus.readers.ValueReader


/**
  * ScalaModule implementation providing all type bindings and instances for injection
  */
class Module extends AbstractModule with ScalaModule {


  /**
    * A very nested optional reader, to support these cases:
    * Not set, set None, will use default ('Lax')
    * Set to null, set Some(None), will use 'No Restriction'
    * Set to a string value try to match, Some(Option(string))
    * https://github.com/mohiva/play-silhouette-seed/blob/4afdd1d1573eb968c8894b11da039f3036a10ff8/app/modules/SilhouetteModule.scala#L46-L63
    */
  implicit val sameSiteReader: ValueReader[Option[Option[Cookie.SameSite]]] =
    (config: Config, path: String) => {
      if (config.hasPathOrNull(path)) {
        if (config.getIsNull(path)) {
          Some(None)
        }
        else {
          Some(Cookie.SameSite.parse(config.getString(path)))
        }
      } else {
        None
      }
    }

  /**
    * Bind types for injection
    *
    * @return
    */
  override def configure() {
    bind(classOf[MyExecutionContext]).to(classOf[MyExecutionContextImpl])
  }
}
