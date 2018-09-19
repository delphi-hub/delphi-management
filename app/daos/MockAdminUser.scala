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

package daos

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordHasher
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.Inject
import models.{Profile, User}
import play.api.Configuration

/**
  * Class providing access to a mocked administrator user object
  */
class MockAdminUser @Inject() (configuration: Configuration){

  //Define constant values for fake user
  val adminMail : String = configuration.underlying.getString("mock.admin.email")
  val adminFullName = "Delphi Administrator"
  val adminFirstName = "Delphi"
  val adminLastName = "Administrator"
  val adminPassword :String = configuration.underlying.getString("mock.admin.password")

  /**
    * Provide access to the User object
    * @param passwordHasher PasswordHasher to user for PasswordInfo
    * @return
    */
  def getAdminUserMock(passwordHasher:PasswordHasher) : User = User(
      id = UUID.randomUUID(),
      profiles=List(Profile(loginInfo = LoginInfo(CredentialsProvider.ID,adminMail),
        confirmed = true, email = Option(adminMail),
        firstName = Option(adminFirstName),
        lastName = Option(adminLastName),
        fullName = Option(adminFullName),
        passwordInfo = Option(passwordHasher.hash(adminPassword) )
      ))
    )

}
