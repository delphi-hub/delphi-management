
package views.html

import _root_.play.twirl.api.TwirlFeatureImports._
import _root_.play.twirl.api.TwirlHelperImports._
import _root_.play.twirl.api.Html
import _root_.play.twirl.api.JavaScript
import _root_.play.twirl.api.Txt
import _root_.play.twirl.api.Xml
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

object index extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template1[String,play.twirl.api.HtmlFormat.Appendable] {

  /*
* This template takes a single argument, a String containing a
* message to display.
*/
  def apply/*5.2*/(message: String):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*5.19*/("""

"""),format.raw/*11.3*/("""
"""),_display_(/*12.2*/main("Delphi - Management Interface")/*12.39*/ {_display_(Seq[Any](format.raw/*12.41*/("""

"""),format.raw/*17.3*/("""
"""),_display_(/*18.2*/welcome(message, style = "scala")),format.raw/*18.35*/("""

""")))}))
      }
    }
  }

  def render(message:String): play.twirl.api.HtmlFormat.Appendable = apply(message)

  def f:((String) => play.twirl.api.HtmlFormat.Appendable) = (message) => apply(message)

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Thu Apr 26 20:51:30 CEST 2018
                  SOURCE: /home/johannes/test_scala_play/delphi-management/app/views/index.scala.html
                  HASH: 8a4e81cf38acf64b7d1300b73b588e28335000b8
                  MATRIX: 815->92|927->109|956->301|984->303|1030->340|1070->342|1099->452|1127->454|1181->487
                  LINES: 24->5|29->5|31->11|32->12|32->12|32->12|34->17|35->18|35->18
                  -- GENERATED --
              */
          