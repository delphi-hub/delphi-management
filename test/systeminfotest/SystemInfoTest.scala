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

package systeminfotest

import authorization.AuthAction
import controllers.SystemInfoController
import org.scalatestplus.play._
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.Configuration
import play.api.mvc._
import play.api.test.Helpers._
import play.api.test._

import scala.concurrent.Future


class SystemInfoTest extends PlaySpec with Results with GuiceOneAppPerTest with Injecting {
// TODO Compilation error in commit ecef020fb7ce5fce52733e214d026e76461bf2a6 so replacing with
//  a simple test case can be replaced with a better one
  "SystemInfo" should {
    "should return a valid SystemInfo Json" in {
      val config = inject[Configuration]
      val auth = inject[AuthAction]
      val controller = new SystemInfoController(stubControllerComponents(), config, auth)
      val result: Future[Result] = controller.getInfo().apply(FakeRequest())
      status(result) mustBe UNAUTHORIZED
    }
  }

}
