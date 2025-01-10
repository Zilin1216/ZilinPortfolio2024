// 安裝所需套件
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var path = require("path");

// 加入文件上傳中間件
server.use(express.static(__dirname + "/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload({ defCharset: "utf8", defParamCharset: "utf8" }));

// 設定資料庫
var DB = require("nedb-promises");
var PortfolioDB = DB.create(__dirname + "/portfolio.db");

PortfolioDB.insert([
    { modal: "card1", imgSrc: "img/project01.png", heading:"窗邊的杏子", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
    { modal: "card2", imgSrc: "img/project02.png", heading:"時髦魔女", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
    { modal: "card3", imgSrc: "img/project03.png", heading:"杏子", text: "Software Used: Procreate" },
    { modal: "card3", imgSrc: "img/project04.PNG", heading:"星", text: "Software Used: Procreate" }
 ])


 server.get("/portfolio", (req, res) => {
  PortfolioDB.find({})
    .then((results) => {
      res.json(results); // 返回 JSON 格式的結果
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching portfolio data");
    });
});

  
  server.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
