//載入模組
var express = require("express");
var server = express();
var bodyParser = require("body-parser");

//初始化伺服器與資料庫
server.use(express.static(__dirname+"/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/Portfolio.db");

server.get("/Portfolio", (req,res)=>{
    //DB
    ProfolioDB.find({}).then(results=>{
      if(results != null){
           res.send(results);
      }else{
          res.send("Zi-Lin's Portfolio");
      }
    })
})


server.listen(80, ()=>{
   console.log("Server is running at port 80.");
})