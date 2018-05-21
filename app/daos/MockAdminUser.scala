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
