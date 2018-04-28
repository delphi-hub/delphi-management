
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

object main extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template2[String,Html,play.twirl.api.HtmlFormat.Appendable] {

  /*
* This template is called from the `index` template. This template
* handles the rendering of the page header and body tags. It takes
* two arguments, a `String` for the title of the page and an `Html`
* object to insert into the body of the page.
*/
  def apply/*7.2*/(title: String)(content: Html):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*7.32*/("""

"""),format.raw/*9.1*/("""<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" media="screen" href=""""),_display_(/*14.50*/routes/*14.56*/.Assets.versioned("stylesheets/bootstrap.min.css")),format.raw/*14.106*/("""" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href=""""),_display_(/*15.35*/routes/*15.41*/.Assets.versioned("stylesheets/default.css")),format.raw/*15.85*/("""">
    <link rel="icon" type="image/png" href=""""),_display_(/*16.46*/routes/*16.52*/.Assets.versioned("images/favicon.png")),format.raw/*16.91*/("""">
    <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro" rel="stylesheet">
    <title>"""),_display_(/*18.13*/title),format.raw/*18.18*/("""</title>
</head>
<body>
<nav class="navbar fixed-top navbar-collapse navbar-toggleable-md navbar-expand-lg navbar-light">
    <a class="navbar-brand py-0" href="#">
        <img src="assets/images/logo.svg" height=30  class="d-inline-block align-top" alt="">
    </a>
    <!--<a href="/" class="nav-link active py-0">Home</a>
    <a href="team.html" class="nav-link py-0">Team</a>
    <!--| <a href="documentation.html">Documentation</a>
    | <a href="delphi/">Try it!</a>-->
    <!--<a href="https://github.com/delphi-hub" class="nav-link py-0">Participate!</a>-->
</nav>

<header>
</header>
<main>
        """),format.raw/*36.32*/("""
        """),_display_(/*37.10*/content),format.raw/*37.17*/("""
"""),format.raw/*38.1*/("""</main>
  <footer class="fixed-bottom">
      <p class="text-center">Delphi (v"""),_display_(/*40.40*/de/*40.42*/.upb.cs.swt.delphi.management.BuildInfo.version),format.raw/*40.89*/(""") is maintained by the <a href="https://www.hni.uni-paderborn.de/en/software-engineering/">Secure Software Engineering group</a> at <a href="https://www.uni-paderborn.de/">Paderborn University</a></p>
  </footer>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src=""""),_display_(/*44.19*/routes/*44.25*/.Assets.versioned("scripts/bootstrap.min.js")),format.raw/*44.70*/("""" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>"""))
      }
    }
  }

  def render(title:String,content:Html): play.twirl.api.HtmlFormat.Appendable = apply(title)(content)

  def f:((String) => (Html) => play.twirl.api.HtmlFormat.Appendable) = (title) => (content) => apply(title)(content)

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Thu Apr 26 20:44:40 CEST 2018
                  SOURCE: /home/johannes/test_scala_play/delphi-management/app/views/main.scala.html
                  HASH: 41b1245af903ec618034e6cff8960041d3a8b912
                  MATRIX: 982->255|1107->285|1135->287|1374->499|1389->505|1461->555|1633->700|1648->706|1713->750|1788->798|1803->804|1863->843|1997->950|2023->955|2660->1654|2697->1664|2725->1671|2753->1672|2859->1751|2870->1753|2938->1800|3589->2424|3604->2430|3670->2475
                  LINES: 26->7|31->7|33->9|38->14|38->14|38->14|39->15|39->15|39->15|40->16|40->16|40->16|42->18|42->18|59->36|60->37|60->37|61->38|63->40|63->40|63->40|67->44|67->44|67->44
                  -- GENERATED --
              */
          