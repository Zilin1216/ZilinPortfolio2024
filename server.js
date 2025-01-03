const express = require("express");
const bodyParser = require("body-parser");
const NeDB = require("nedb");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// 初始化資料庫
const db = new NeDB({
  filename: path.join(__dirname, "data", "images.db"),
  autoload: true,
});

// 檢查並創建 `uploads` 資料夾
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 配置 Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // 上傳目錄
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // 以時間戳命名檔案
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 靜態檔案服務
app.use(express.static(path.join(__dirname, "Portfolio")));
app.use("/uploads", express.static("uploads"));

// 中間件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Portfolio", "index.html"));
});

app.post("/api/uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("未上傳檔案");
  }

  const { title, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const newImage = { title, description, imageUrl };

  // 將資料儲存到 NeDB
  db.insert(newImage, (err, newDoc) => {
    if (err) {
      return res.status(500).send("新增圖片失敗");
    }
    res.status(201).json(newDoc);
  });
});

app.get("/api/images", (req, res) => {
  db.find({}, (err, images) => {
    if (err) {
      return res.status(500).send("資料讀取錯誤");
    }
    res.json(images);
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器運行中，請訪問：http://localhost:${port}`);
});
