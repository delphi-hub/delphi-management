package daos

import scala.concurrent.Future
import com.mohiva.play.silhouette.api.util.{PasswordHasher, PasswordInfo}
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject
import models.User

class MockPasswordInfoDao @Inject() (hasher: PasswordHasher) extends DelegableAuthInfoDAO[PasswordInfo] {
  var users = scala.collection.mutable.Set[User]()
  users += new MockAdminUser().getAdminUserMock(hasher)


  def find(loginInfo:LoginInfo):Future[Option[PasswordInfo]] = {
    val user = users.find(_.profileFor(loginInfo).isDefined)
    return Future.successful(user.flatMap(_.profiles.find(_.loginInfo == loginInfo)).flatMap(_.passwordInfo))
  }

  def add(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
  {
    var user = users.find(_.profileFor(loginInfo).isDefined)
    //TODO: Add new password info to profile, not needed for Mock
    return Future.successful(authInfo)
  }


  def update(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
    add(loginInfo, authInfo)

  def save(loginInfo:LoginInfo, authInfo:PasswordInfo):Future[PasswordInfo] =
    add(loginInfo, authInfo)

  //TODO: Remove Pr, not needed for Mock
  def remove(loginInfo:LoginInfo):Future[Unit] =
    Future.successful(():Unit)
}
