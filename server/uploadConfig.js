// uploadConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './images/profile/',
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
