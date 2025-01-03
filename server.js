//載入模組
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
const NeDB = require('nedb');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//初始化伺服器與資料庫
app.use(express.static(path.join(__dirname, 'Portfolio')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
app.use('/uploads', express.static('uploads'));

// 配置 NeDB
const db = new NeDB({
  filename: 'images.db',
  autoload: true,
});

// 檢查並建立 `uploads` 資料夾
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


// JSON 解析中間件
app.use(express.json());
// 提供首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Portfolio', 'index.html'));
});

// 配置 multer 上傳文件的存儲目錄和檔名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // 上傳目錄
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 處理文件上傳與表單數據
app.post('/api/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`; // 儲存圖片路徑

  const newImage = { title, description, imageUrl };

  // 將圖片資料保存到 NeDB
  db.insert(newImage, (err, newDoc) => {
      if (err) {
          return res.status(500).send('新增圖片失敗');
      }
      res.status(201).json(newDoc); // 回傳新增的圖片資料
  });
});
app.get('/api/images', (req, res) => {
  db.find({}, (err, images) => {
      if (err) {
          return res.status(500).send('資料讀取錯誤');
      }
      res.json(images); // 返回圖片資料
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器運行中，請訪問：http://localhost:${port}`);
});