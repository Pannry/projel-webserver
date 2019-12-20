const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'app/uploads/',
  filename(req, file, cb) {
    cb(null, `${Date.now().toString().substring(5, 13)}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload.array('fileUpload', 5);
