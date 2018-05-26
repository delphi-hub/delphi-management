package utils.auth

import com.mohiva.play.silhouette.api.Env
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import models.User

/**
  * Default silhouette environment used in this application
  */
trait DefaultEnv extends Env {
  type I = User
  type A = CookieAuthenticator
}