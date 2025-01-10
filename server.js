var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var path = require("path");

// 使用中間件
server.use(express.static(__dirname + "/Portfolio"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload({ defCharset: "utf8", defParamCharset: "utf8" }));

// 設定資料庫
var DB = require("nedb-promises");
var PortfolioDB = DB.create(__dirname + "/portfolio.db");

// 初始化資料庫（僅供測試，實際應該移除靜態插入邏輯）
// 如果資料庫是空的，可以執行一次插入初始資料
/*PortfolioDB.find({}).then((results) => {
  if (results.length === 0) {
    PortfolioDB.insert([
      { modal: "card1", imgSrc: "img/project01.png", heading: "窗邊的杏子", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
      { modal: "card2", imgSrc: "img/project02.png", heading: "時髦魔女", text: "Software Used: Procreate, Adobe Illustration, Photoshop" },
      { modal: "card3", imgSrc: "img/project03.png", heading: "杏子", text: "Software Used: Procreate" },
    ]).then(() => console.log("Initial data inserted."));
  }
});*/

// GET 路由 - 返回所有作品資料
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

// POST 路由 - 新增作品資料
server.post("/portfolio/add", (req, res) => {
  const newCard = req.body;

  // 驗證資料完整性
  if (!newCard.modal || !newCard.imgSrc || !newCard.heading || !newCard.text) {
    return res.status(400).send("Incomplete card data");
  }

  // 插入新資料到資料庫
  PortfolioDB.insert(newCard)
    .then(() => {
      console.log("New card added:", newCard);
      res.status(200).send("New card added successfully");
    })
    .catch((error) => {
      console.error("Error adding new card:", error);
      res.status(500).send("Error adding new card");
    });
});

// 啟動伺服器
server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});