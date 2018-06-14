package controllers

import java.io._

import akka.http.scaladsl.model.Uri
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode

import scala.util.{Failure, Success}

/**
  * The implementation of the CrawlerController.
  * Tries to connect to the local Delphi Crawler Service and reports on the results of the version call.
  */
object CrawlerController {


  val server: String = sys.env.getOrElse("DELPHI_CRAWLER", "http://localhost:8882")

  val uri = Uri(server)

  val resp = BlockingHttpClient.doGet(uri.withPath(uri.path + "/version"))
  //println(s"Contacting server ${uri}...")

  resp match {
    case Success(res) => {
      println("Successfully contacted Crawler server. ")
      println("Server version: " + res)


      //creating JSON Object

      val mapper = new ObjectMapper()
      val root: ObjectNode = mapper.createObjectNode()
      root.put("version", res)
      val rootRead = mapper.readTree(root.toString)


      val pw = new PrintWriter(new File("CrawlerConfigurations.json"))
      pw.write(rootRead.toString)
      pw.close


    }


    case Failure(_) => {
      println(s"Could not reach server ${server}.")

      val fail = "Crawler instance is currently not running in your system"
    }
  }


}


