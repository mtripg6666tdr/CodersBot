require("dotenv").config();
import * as http from "http";
import { CodersBot } from "./bot";

if(process.env.HTTP_SERVER === "true"){
  http.createServer((req, res) => {
    res
      .writeHead(200, {"Content-Type": "text/plain"})
      .end("Discord bot is active now")
      ;
  }).listen(8080);
}

new CodersBot().Run(process.env.TOKEN);