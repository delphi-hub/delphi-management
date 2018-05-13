package daostest

import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import org.scalatest.FlatSpec
import daos.MockAdminUser
import play.api.Configuration

class MockAdminUserTest  extends FlatSpec{


  val configuration = Configuration.from(Map(
    "mock.admin.email" -> "admin@delphi.upb.de",
    "mock.admin.password" -> "admin@delphi"))

  var hasher = new BCryptPasswordHasher()
  var mockAdminUser = new MockAdminUser(configuration)

  "A MockAdminUser" should "have exactly one profile " in
  {
    assertResult(1)(mockAdminUser.getAdminUserMock(hasher).profiles.size)
  }

  it should "contain the E-Mail specified in the configuration" in
  {
    val expected = configuration.underlying.getString("mock.admin.email")
    assertResult(expected)(mockAdminUser.getAdminUserMock(hasher).profiles.head.email.get)
  }

  it should "contain the password specified in the configuration" in
  {

    val expected = configuration.underlying.getString("mock.admin.password")

    val valid = hasher.matches(mockAdminUser.getAdminUserMock(hasher).profiles.head.passwordInfo.get, expected)
    assert(valid)
  }



}
