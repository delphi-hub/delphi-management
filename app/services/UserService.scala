package services

import java.util.UUID
import javax.inject._

import scala.concurrent.Future

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService

import daos.UserDao
import models.User

class UserService @Inject() (userDao:UserDao) extends IdentityService[User] {
  def retrieve(loginInfo:LoginInfo):Future[Option[User]] = userDao.find(loginInfo)
  def save(user:User) = userDao.save(user)
  def find(id:UUID) = userDao.find(id)
  def confirm(loginInfo:LoginInfo) = userDao.confirm(loginInfo)
}
