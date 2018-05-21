package services

import java.util.UUID
import javax.inject.Inject

import scala.concurrent.Future

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService

import models.User
import daos.UserDao

/**
  * Implementation of silhouette IdentityService for this application. Uses Identity implementation models.User .
  * @param userDao Injected handle of current UserDao
  */
class UserService @Inject() (userDao:UserDao) extends IdentityService[User] {
  def retrieve(loginInfo:LoginInfo):Future[Option[User]] = userDao.find(loginInfo)
  def save(user:User) : Future[User] = userDao.save(user)
  def find(id:UUID):Future[Option[User]] = userDao.find(id)
  def confirm(loginInfo:LoginInfo):Future[User] = userDao.confirm(loginInfo)
}
