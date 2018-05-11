package services

import java.util.UUID
import javax.inject._

import daos.UserTokenDao
import models.UserToken

class UserTokenService @Inject() (userTokenDao:UserTokenDao) {
  def find(id:UUID) = userTokenDao.find(id)
  def save(token:UserToken) = userTokenDao.save(token)
  def remove(id:UUID) = userTokenDao.remove(id)
}
