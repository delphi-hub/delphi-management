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

import javax.inject.Inject
import pdi.jwt._
import play.api.http.HeaderNames
import play.api.mvc._
import authorization.AuthProvider
import play.api.Configuration

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

// A custom request type to hold our JWT claims, we can pass these on to the
// handling action
//case class UserRequest[A](jwt: JwtClaim, token: String, request: Request[A]) extends WrappedRequest[A](request)

// Our custom action implementation
class AuthAction @Inject()(bodyParser: BodyParsers.Default)(implicit ec: ExecutionContext, config: Configuration)
  extends ActionBuilder[Request, AnyContent] {

  override def parser: BodyParser[AnyContent] = bodyParser
  override protected def executionContext: ExecutionContext = ec

  // A regex for parsing the Authorization header value
  private val headerTokenRegex = """Bearer (.+?)""".r

  // Called when a request is invoked. We should validate the bearer token here
  // and allow the request to proceed if it is valid.
  override def invokeBlock[A](request: Request[A], block: Request[A] => Future[Result]): Future[Result] =
    extractBearerToken(request) map { token =>
      if(AuthProvider.validateJwt(token)) {
        block(request)   // token was valid - proceed!
      } else {
        Future.successful(Results.Unauthorized("Invalid"))  // token was invalid - return 401
      }
    } getOrElse Future.successful(Results.Unauthorized)     // no token was sent - return 401

  // Helper for extracting the token value
  private def extractBearerToken[A](request: Request[A]): Option[String] =
    request.headers.get(HeaderNames.AUTHORIZATION) collect {
      case headerTokenRegex(token) => token
    }
}
