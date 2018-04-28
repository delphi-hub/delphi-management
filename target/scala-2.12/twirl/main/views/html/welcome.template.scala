
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

object welcome extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template2[String,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(message: String, style: String = "scala"):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.44*/("""

"""),format.raw/*3.1*/("""<section id="top">
    <div class="jumbotron">
        <h1>Welcome to the Delphi-Management-Interface!</h1>
    </div>
</section>

<div id="content" class="container">
    <article>

        <h1>What is Delphi?</h1>

        <p>
            Delphi is a platform to retrieve meta-information on JVM-bytecode based projects.
        </p>


        <h2>What can Delphi do for you?</h2>

        <p>
            You can either query a complete set of information for a specific project or you can retrieve a list of
            matching projects based on specific metrics.
        </p>

        <h2>What is this page used for?</h2>

        <p>
            Once implemented, this page will give you access to the management interface of Delphi. You will be able
            to control the Delphi-Crawlers, configure the Elasticsearch database and administrate your instances of
            Delphi. For now, this page is a placeholder for the future implementation.
        </p>




    </article>



</div>

"""))
      }
    }
  }

  def render(message:String,style:String): play.twirl.api.HtmlFormat.Appendable = apply(message,style)

  def f:((String,String) => play.twirl.api.HtmlFormat.Appendable) = (message,style) => apply(message,style)

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Thu Apr 26 20:51:30 CEST 2018
                  SOURCE: /home/johannes/test_scala_play/delphi-management/app/views/welcome.scala.html
                  HASH: 01e78e10f4124214f6654455ee48051dacc06eba
                  MATRIX: 738->1|875->43|903->45
                  LINES: 21->1|26->1|28->3
                  -- GENERATED --
              */
          