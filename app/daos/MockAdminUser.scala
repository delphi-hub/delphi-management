package daos

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.{PasswordHasher}
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.{Profile, User}

class MockAdminUser {

  val admin_mail = "admin@delphi.upb.de"
  val admin_full_name = "Delphi Administrator"
  val admin_first_name = "Delphi"
  val admin_last_name = "Administrator"
  val admin_password = "admin@delphi"


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
