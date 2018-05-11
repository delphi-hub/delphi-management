package module


import com.google.inject.name.Named
import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.crypto.{Crypter, CrypterAuthenticatorEncoder, Signer}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository
import com.mohiva.play.silhouette.impl.util._
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import com.mohiva.play.silhouette.crypto.{JcaCrypter, JcaCrypterSettings, JcaSigner, JcaSignerSettings}
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.ws.WSClient
import daos._
import models.User
import play.api.i18n._
import play.api.mvc.CookieHeaderEncoding
import services.UserService
import utils.auth.DefaultEnv

class Module extends AbstractModule with ScalaModule {

  def configure() {
    bind[Silhouette[DefaultEnv]].to[SilhouetteProvider[DefaultEnv]]
    bind[IdentityService[User]].to[UserService]
    bind[UserDao].to[MockUserDao]
    bind[UserTokenDao].to[MockUserTokenDao]
    bind[DelegableAuthInfoDAO[PasswordInfo]].to[MockPasswordInfoDao]
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[PasswordHasher].toInstance(new BCryptPasswordHasher)
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
  }

  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

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

  @Provides
  def providePasswordHasherRegistry(passwordHasher: PasswordHasher): PasswordHasherRegistry = {
    new PasswordHasherRegistry(passwordHasher)
  }

  @Provides
  def provideAuthenticatorCookieSigner(configuration: Configuration): Signer = {
    val config = configuration.underlying.as[JcaSignerSettings]("silhouette.authenticator.cookie.signer")
    new JcaSigner(config)
  }



  @Provides
  def provideCredentialsProvider(
                                  authInfoRepository: AuthInfoRepository,
                                  passwordHasherRegistry: PasswordHasherRegistry): CredentialsProvider = {

    new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
  }

  @Provides
  def provideAuthInfoRepository(passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]): AuthInfoRepository = {
    new DelegableAuthInfoRepository(passwordInfoDAO)
  }

  @Provides
  def provideAuthenticatorCrypter(configuration: Configuration): Crypter = {
    val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.authenticator.crypter")
    new JcaCrypter(config)
  }



}
