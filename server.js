// 安裝所需套件
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var DB = require("nedb-promises");
// 加入文件上傳中間件
server.use(express.static(__dirname + "/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload({ defCharset: "utf8", defParamCharset: "utf8" }));

// 設定資料庫
var server = express();
var portfolioDB = DB.create(__dirname + "/portfolio.db");

// 靜態資源路徑
server.use(express.static(__dirname + "/Portfolio"));

ProfolioDB.insert([
    { modal: "card1", imgSrc: "img/project01.png", title:"窗邊的杏子", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
    { modal: "card2", imgSrc: "img/project02.png", title:"時髦魔女", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
    { modal: "card3", imgSrc: "img/project03.png", title:"杏子", text: "Software Used: Procreate" },
 ])

// 提供 API：取得資料庫中的資料
server.get("/api/portfolio", async (req, res) => {
    try {
      const newItem = await PortfolioDB.insert({newItem});
      res.status(201).json(insertedItem); // 返回 JSON 格式的資料給前端
    } catch (error) {
      res.status(500).send("Error fetching data from database.");
    }
  });
  
  server.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
