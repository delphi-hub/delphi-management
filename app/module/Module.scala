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

import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.crypto.{Crypter, CrypterAuthenticatorEncoder, Signer}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.{AuthenticatorService, IdentityService}
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.crypto.{JcaCrypter, JcaCrypterSettings, JcaSigner, JcaSignerSettings}
import com.mohiva.play.silhouette.impl.authenticators.{CookieAuthenticator, CookieAuthenticatorService, CookieAuthenticatorSettings}
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.mohiva.play.silhouette.impl.util.{DefaultFingerprintGenerator, SecureRandomIDGenerator}
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository
import com.typesafe.config.Config
import controllers.{MyExecutionContext, MyExecutionContextImpl}
import daos.{MockPasswordInfoDao, MockUserDao, UserDao}
import models.User
import net.ceedubs.ficus.readers.ArbitraryTypeReader.arbitraryTypeValueReader
import net.ceedubs.ficus.Ficus.{booleanValueReader, finiteDurationReader, optionValueReader, stringValueReader, toFicusConfig}
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.ws.WSClient
import play.api.mvc.{Cookie, CookieHeaderEncoding}
import services.UserService
import utils.auth.DefaultEnv
import net.ceedubs.ficus.readers.ValueReader

import scala.concurrent.ExecutionContext.Implicits.global

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
    * @return
    */
  def configure() {
    bind[Silhouette[DefaultEnv]].to[SilhouetteProvider[DefaultEnv]]
    bind[IdentityService[User]].to[UserService]
    bind[UserDao].to[MockUserDao]
    bind[DelegableAuthInfoDAO[PasswordInfo]].to[MockPasswordInfoDao]
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[PasswordHasher].toInstance(new BCryptPasswordHasher)
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
    bind(classOf[MyExecutionContext]).to(classOf[MyExecutionContextImpl])
  }

  /**
    * Provide a HttpLayer
    */
  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

  /**
    *Provide an environment
    */
  @Provides
  def provideEnvironment(
                          userService: UserService,
                          authenticatorService: AuthenticatorService[CookieAuthenticator],
                          eventBus: EventBus): Environment[DefaultEnv] = {

    Environment[DefaultEnv](
      userService,
      authenticatorService,
      Seq(),
      eventBus
    )
  }

  /**
    * Provide an AuthenticatorService
    */
  @Provides
  def provideAuthenticatorService(
                                   signer: Signer,
                                   crypter: Crypter,
                                   cookieHeaderEncoding: CookieHeaderEncoding,
                                   fingerprintGenerator: FingerprintGenerator,
                                   idGenerator: IDGenerator,
                                   configuration: Configuration,
                                   clock: Clock): AuthenticatorService[CookieAuthenticator] = {

    val config = configuration.underlying.as[CookieAuthenticatorSettings]("silhouette.authenticator")
    val authenticatorEncoder = new CrypterAuthenticatorEncoder(crypter)

    new CookieAuthenticatorService(config, None, signer, cookieHeaderEncoding, authenticatorEncoder, fingerprintGenerator, idGenerator, clock)
  }

  /**
    * Provide a PasswordHasherRegistry
    */
  @Provides
  def providePasswordHasherRegistry(passwordHasher: PasswordHasher): PasswordHasherRegistry = {
    PasswordHasherRegistry(passwordHasher)
  }

  /**
    * Provide an instance of JcaSigner as Signer
    */
  @Provides
  def provideAuthenticatorCookieSigner(configuration: Configuration): Signer = {
    val config = configuration.underlying.as[JcaSignerSettings]("silhouette.authenticator.cookie.signer")
    new JcaSigner(config)
  }

  /**
    * Provide a CredetialsProvider
    */
  @Provides
  def provideCredentialsProvider(
                                  authInfoRepository: AuthInfoRepository,
                                  passwordHasherRegistry: PasswordHasherRegistry): CredentialsProvider = {

    new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
  }

  /**
    * Provide a AuthInfoRepository
    */
  @Provides
  def provideAuthInfoRepository(passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]): AuthInfoRepository = {
    new DelegableAuthInfoRepository(passwordInfoDAO)
  }

  /**
    * Provide an instance of JcaCrypter as Crypter
    */
  @Provides
  def provideAuthenticatorCrypter(configuration: Configuration): Crypter = {
    val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.authenticator.crypter")
    new JcaCrypter(config)
  }
}
