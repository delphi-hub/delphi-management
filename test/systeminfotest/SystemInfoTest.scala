package systeminfotest

import org.scalatest.FlatSpec
import controllers.{HostName, JavaVersion, ScalaVersion}

class SystemInfoTest  extends FlatSpec {
  it should "contains non empty java version" in {
    assertResult(false)(Option(JavaVersion(None)).isEmpty)
  }
  it should "contains non empty scala version" in {
    assertResult(false)(Option(ScalaVersion(None)).isEmpty)
  }
  it should "contains non empty hostname" in {
    assertResult(false)(Option(HostName(None)).isEmpty)
  }
  it should "contains non empty platform value" in {
    assertResult(false)(Option(JavaVersion(None)).isEmpty)
  }

}
