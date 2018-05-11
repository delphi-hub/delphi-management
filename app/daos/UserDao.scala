package daos

import java.util.UUID

import scala.concurrent.Future
import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordHasher
import javax.inject.Inject
import models.{Profile, User}

trait UserDao {
  def find(loginInfo:LoginInfo):Future[Option[User]]
  def find(userId:UUID):Future[Option[User]]
  def save(user:User):Future[User]
  def confirm(loginInfo:LoginInfo):Future[User]
  def link(user:User, profile:Profile):Future[User]
  def update(profile:Profile):Future[User]
}

class MockUserDao @Inject() (hasher: PasswordHasher) extends UserDao {

  var users = scala.collection.mutable.Set[User]()
  users += new MockAdminUser().getAdminUserMock(hasher)

  def find(loginInfo:LoginInfo):Future[Option[User]] =
    Future.successful(users.find(_.profileFor(loginInfo).isDefined))

  def find(userId:UUID):Future[Option[User]] =
    Future.successful(users.find(_.id == userId))

  def save(user:User):Future[User] = {
    users += user
    return Future.successful(user)
  }

  def confirm(loginInfo:LoginInfo):Future[User] =
  {
    val user = users.find(_.profileFor(loginInfo).isDefined).get
    //TODO: Set confirm attribute, not needed for mock
    return Future.successful(user)
  }

  def link(user:User, profile:Profile): Future[User] =
  {
    //TODO: Link given profile to user, not needed for mock
    return Future.successful(user)
  }

  def update(profile:Profile):Future[User] =
  {
    //TODO: Update user profile, not needed for mock
    return Future.successful(users.find(_.profiles.contains(profile)).get)
  }
}
