
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/johannes/abm/delphi/delphi-management/conf/routes
// @DATE:Thu Apr 26 21:04:16 CEST 2018


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
