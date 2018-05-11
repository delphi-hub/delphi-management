package daos

import java.util.UUID

import scala.concurrent.Future

import models.UserToken

trait UserTokenDao {
  def find(id:UUID):Future[Option[UserToken]]
  def save(token:UserToken):Future[UserToken]
  def remove(id:UUID):Future[Unit]
}

class MockUserTokenDao extends UserTokenDao {

  var tokens = scala.collection.mutable.Set[UserToken]()

  def find(id:UUID):Future[Option[UserToken]] =
    Future.successful(tokens.find(_.id == id))

  def save(token:UserToken):Future[UserToken] =
  {
    tokens += token
    return Future.successful(token)
  }
  def remove(id:UUID):Future[Unit] = {
    tokens.remove(tokens.find(_.id == id).get)
    Future.successful(():Unit)
  }

}