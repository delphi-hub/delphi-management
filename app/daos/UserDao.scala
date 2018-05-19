package daos

import java.util.UUID

import scala.concurrent.Future
import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordHasher
import javax.inject.Inject
import models.User
import play.api.Configuration

/**
  * Trait for a User-Data-Access-Object
  */
trait UserDao {
  def find(loginInfo:LoginInfo):Future[Option[User]]
  def find(userId:UUID):Future[Option[User]]
  def save(user:User):Future[User]
  def confirm(loginInfo:LoginInfo):Future[User]
}

/**
  * Mocked implementation of UserDao providing a fake database containing exactly one user.
  * @param configuration Injected handle of current play configuration
  * @param hasher Injected handle of PasswordHasher to use
  */
class MockUserDao @Inject() (configuration: Configuration,hasher: PasswordHasher) extends UserDao {

  //Create fake db as mutable set, add fake user
  var users : scala.collection.mutable.Set[User] = scala.collection.mutable.Set[User]()
  users += new MockAdminUser(configuration).getAdminUserMock(hasher)

  /**
    * Find a user in the db with the given LoginInfo
    * @param loginInfo LoginInfo of the user
    * @return User object if it will be found, None otherwise
    */
  def find(loginInfo:LoginInfo):Future[Option[User]] =
    Future.successful(users.find(_.profileFor(loginInfo).isDefined))

  /**
    * Find a user in the db with the given UUID
    * @param userId UUID of the user
    * @return User object if it will be found, None otherwise
    */
  def find(userId:UUID):Future[Option[User]] =
    Future.successful(users.find(_.id == userId))

  /**
    * Add a new user to the db
    *   (Note: Not needed for mock)
    * @param user User to add
    * @return User object after it was added
    */
  def save(user:User):Future[User] = {
    users += user
    Future.successful(user)
  }

  /**
    * Mark user with the given LoginInfo as confirmed
    *   (Note: Not needed for mock impl)
    * @param loginInfo LoginInfo of the user to confirm
    * @return User object after its confirmation
    */
  def confirm(loginInfo:LoginInfo):Future[User] =
  {
    val user = users.find(_.profileFor(loginInfo).isDefined).get
    //TODO: Set confirm attribute, not needed for mock
    Future.successful(user)
  }


}
