// Copyright (C) 2018 The Delphi Team.
// See the LICENCE file distributed with this work for additional
// information regarding copyright ownership.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package authorization


import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import play.api.Configuration

  object AuthProvider {

    /** This method generates JWT token for registering Delphi-Management at the Instance-Registry
      *
      * @param validFor
      * @return
      */

    def generateJwt(validFor: Long = 1)(implicit configuration: Configuration): String = {


      val jwtSecretKey = configuration.get[String]("play.http.secret.JWTkey")
      val claim = JwtClaim()
        .issuedNow
        .expiresIn(validFor * 300)
        .startsNow
        . +("user_id",  configuration.get[String]("play.http.instance"))
        . +("user_type", "Admin")

      Jwt.encode(claim, jwtSecretKey, JwtAlgorithm.HS256)
    }
  }
