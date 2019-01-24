package authorization



import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
object AuthProvider {
  val jwtSecretKey: String  = sys.env.getOrElse("DELPHI_JWT_SECRET","changeme")
  def generateJwt(validFor: Long = 1, useGenericName: Boolean = false): String = {
    val claim = JwtClaim()
      .issuedNow
      .expiresIn(validFor * 60)


    Jwt.encode(claim, jwtSecretKey, JwtAlgorithm.HS256)
  }


}
