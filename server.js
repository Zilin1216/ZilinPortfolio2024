//載入模組
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
const PORT =80;
// 載入模組
const DB = require("nedb-promises");


//初始化伺服器與資料庫
server.use(express.static(__dirname+"/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
// 初始化資料庫
const PortfolioDB = DB.create({
  filename: __dirname + "/Portfolio.db", // 指定資料庫文件
  autoload: true, // 自動載入資料庫
});
var ProfolioDB = DB.create(__dirname+"/Portfolio.db");

server.get("/api/portfolio", (req, res) => {
  ProfolioDB.find({}).then(results => {
      if (results != null) {
          res.json(results); // 使用 JSON 格式返回
      } else {
          res.send("Zi-Lin's Portfolio");
      }
  });
});



server.listen(80, ()=>{
   console.log("Server is running at port 80.");
   console.log(`Server running at http://localhost:${PORT}`);
})