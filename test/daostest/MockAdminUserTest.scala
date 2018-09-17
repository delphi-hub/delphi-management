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

package daostest

import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import org.scalatest.FlatSpec
import daos.MockAdminUser
import play.api.Configuration

class MockAdminUserTest  extends FlatSpec{


  val configuration : Configuration = Configuration.from(Map(
    "mock.admin.email" -> "admin@delphi.upb.de",
    "mock.admin.password" -> "admin@delphi"))

  val hasher = new BCryptPasswordHasher()
  val mockAdminUser = new MockAdminUser(configuration)

  "A MockAdminUser" should "have exactly one profile " in
  {
    assertResult(1)(mockAdminUser.getAdminUserMock(hasher).profiles.size)
  }

  it should "contain the E-Mail specified in the configuration" in
  {
    val expected = configuration.underlying.getString("mock.admin.email")
    assertResult(expected)(mockAdminUser.getAdminUserMock(hasher).profiles.head.email.get)
  }

  it should "contain the password specified in the configuration" in
  {

    val expected = configuration.underlying.getString("mock.admin.password")

    val valid = hasher.matches(mockAdminUser.getAdminUserMock(hasher).profiles.head.passwordInfo.get, expected)
    assert(valid)
  }



}
