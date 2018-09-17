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

package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}
import com.mohiva.play.silhouette.api.util.PasswordInfo
/**
  * Class representing a profile, meaning a way to authenticate a user. A user may have different profiles (e.g. social media, etc..)
  * @param loginInfo LoginInfo for the profile
  * @param confirmed Boolean indicating whether this profile has been confirmed
  * @param email E-Mail for this profile
  * @param firstName First name
  * @param lastName Last name
  * @param fullName Full name
  * @param passwordInfo PasswordInfo for this profile
  */
case class Profile(
                    loginInfo:LoginInfo,
                    confirmed: Boolean,
                    email:Option[String],
                    firstName: Option[String],
                    lastName: Option[String],
                    fullName: Option[String],
                    passwordInfo:Option[PasswordInfo])

/**
  * Implementation of a silhouette Identity used in this application
  * @param id UUID of the user
  * @param profiles List of profiles this user has linked
  */
case class User(id: UUID, profiles: List[Profile]) extends Identity {
  def profileFor(loginInfo:LoginInfo):Option[Profile] = profiles.find(_.loginInfo == loginInfo)
  def fullName(loginInfo:LoginInfo):Option[String] = profileFor(loginInfo).flatMap(_.fullName)
}
