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

// package utils

// import com.mohiva.play.silhouette.api.actions.SecuredErrorHandler
// import javax.inject.Inject
// import play.api.http.DefaultHttpErrorHandler
// import play.api.i18n.{MessagesApi,I18nSupport,Messages,MessagesImpl,Lang}
// import play.api.mvc.Results.{Redirect,Ok}
// import play.api.mvc.{RequestHeader, Result}

// import scala.concurrent.Future
// import controllers.routes

// /**
//   * HttpErrorHandler for this application. Handles authentication issues as well as 404 / 500 errors.
//   *
//   * @param messagesApi Injected handle of current MessagesApi
//   */
// class ErrorHandler @Inject() (val messagesApi: MessagesApi)
//   extends DefaultHttpErrorHandler with SecuredErrorHandler
//     with I18nSupport  {

//   //Implicitly define Messages Instance, needed for calling html templates
//   implicit val messages : Messages = MessagesImpl(Lang("en"), messagesApi)


//   override def onNotAuthenticated(implicit request: RequestHeader): Future[Result] =
//     Future.successful(Redirect(routes.AuthController.signIn()))

//   override def onNotAuthorized(implicit request: RequestHeader): Future[Result] =
//     Future.successful(Redirect(routes.AuthController.signIn()).flashing("error" -> Messages("error.accessDenied")))

//   override def onNotFound(request: RequestHeader, message: String): Future[Result] =
//     Future.successful(Ok(views.html.errors.notFound(request)))

//   override def onServerError(request:RequestHeader, exception:Throwable):Future[Result] =
//     Future.successful(Ok(views.html.errors.serverError(request, exception)))








// }