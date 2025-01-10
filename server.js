var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var path = require("path");

// 使用中間件
server.use(express.static(__dirname + "/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// 設定資料庫
var DB = require("nedb-promises");
var PortfolioDB = DB.create(__dirname + "/portfolio.db");

// 初始化資料庫（僅供測試，實際應用中可以手動插入資料）
/*PortfolioDB.find({}).then((results) => {
  if (results.length === 0) {
    PortfolioDB.insert([
      {
        modal: "card1",
        imgSrc: "img/project01.png",
        heading: "窗邊的杏子",
        text: "Software Used: Procreate, Adobe Illustration, Photoshop",
      },
      {
        modal: "card2",
        imgSrc: "img/project02.png",
        heading: "時髦魔女",
        text: "Software Used: Procreate, Adobe Illustration, Photoshop",
      },
      {
        modal: "card3",
        imgSrc: "img/project03.png",
        heading: "杏子",
        text: "Software Used: Procreate",
      },
    ]).then(() => console.log("Initial data inserted."));
  }
});*/

PortfolioDB.insert([
  {
    modal: "card1",
    imgSrc: "img/project04.PNG",
    heading: "star",
    text: "Software Used: Procreate, Adobe Illustration, Photoshop",
  
  },])

// API 路由 - 返回所有資料
server.get("/portfolio", (_req, res) => {
  PortfolioDB.find({})
    .then((results) => {
      res.json(results); // 返回 JSON 格式的資料
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching portfolio data");
    });
});

// 啟動伺服器
server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
