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
  val admin_mail = configuration.underlying.getString("mock.admin.email")
  val admin_full_name = "Delphi Administrator"
  val admin_first_name = "Delphi"
  val admin_last_name = "Administrator"
  val admin_password = configuration.underlying.getString("mock.admin.password")

  /**
    * Provide access to the User object
    * @param passwordHasher
    * @return
    */
  def getAdminUserMock(passwordHasher:PasswordHasher) : User =
  {

    return User(
      id = UUID.randomUUID(),
      profiles=List(Profile(loginInfo = LoginInfo(CredentialsProvider.ID,admin_mail),
        confirmed = true, email = Option(admin_mail),
        firstName = Option(admin_first_name),
        lastName = Option(admin_last_name),
        fullName = Option(admin_full_name),
        passwordInfo = Option(passwordHasher.hash(admin_password) )
      ))
    )
  }

}
