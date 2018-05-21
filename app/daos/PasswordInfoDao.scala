package daos

import scala.concurrent.Future
import com.mohiva.play.silhouette.api.util.{PasswordHasher, PasswordInfo}
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject
import models.User
import play.api.Configuration

/**
  * Mocked implementation of a silhouette AuthInfoDAO containing exactly one user oject.
  * @param hasher Injected handle of PasswordHasher to use
  * @param configuration Injected handle of current play configuration
  */
class MockPasswordInfoDao @Inject() (configuration: Configuration, hasher: PasswordHasher) extends DelegableAuthInfoDAO[PasswordInfo] {

  //Create fake db as mutable set, add fake user
  val users : scala.collection.mutable.Set[User] = scala.collection.mutable.Set[User]()
  users += new MockAdminUser(configuration).getAdminUserMock(hasher)


  /**
    * Finds users PasswordInfo by its given LoginInfo
    * @param loginInfo LoginInfo of the user
    * @return PasswordInfo of the user
    */
  def find(loginInfo:LoginInfo):Future[Option[PasswordInfo]] = {
    val user = users.find(_.profileFor(loginInfo).isDefined)
    Future.successful(user.flatMap(_.profiles.find(_.loginInfo == loginInfo)).flatMap(_.passwordInfo))
  }

  /**
    * Adds a new PasswordInfo to an existing user with the given LoginInfo
    *   (Note: Not needed for mock)
    * @param loginInfo LoginInfo of existing user
    * @param authInfo PasswordInfo to add
    * @return Added PasswordInfo
    */
  def add(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
  {
    var user = users.find(_.profileFor(loginInfo).isDefined)
    //TODO: Add new password info to profile, not needed for Mock
    Future.successful(authInfo)
  }

  /**
    * Update current user with given LoginInfo
    *   (Note: Not needed for mock)
    * @param loginInfo Users LoginInfo
    * @param authInfo PasswordInfo to update
    * @return Updated PasswordInfo
    */
  def update(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
    add(loginInfo, authInfo)

  /**
    * Save current user with given LoginInfo
    *   (Note: Not needed for mock)
    * @param loginInfo Users LoginInfo
    * @param authInfo PasswordInfo to save
    * @return Saved PasswordInfo
    */
  def save(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
    add(loginInfo, authInfo)

  /**
    * Remove a user with the given LoginInfo from the db
    *   (Note: Not needed for mock)
    * @param loginInfo LoginInfo of user to remove
    * @return Unit
    */
  def remove(loginInfo:LoginInfo):Future[Unit] = //TODO:Remove user
    Future.successful(():Unit)
}
