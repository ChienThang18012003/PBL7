const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Tạo thư mục nếu chưa tồn tại
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const sanitizedField = file.fieldname.replace(/\s+/g, "_");
    cb(null, `${sanitizedField}-${uniqueSuffix}${ext}`);
  },
});

// Bộ lọc file (chỉ nhận ảnh)
const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|bmp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    req.fileValidationError = "Only image files are allowed!";
    cb(null, false);
  }
};

// Bộ lọc file (chỉ nhận PDF)
const pdfFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    req.fileValidationError = "Only PDF files are allowed!";
    cb(null, false);
  }
};

// Hàm upload file PDF
const uploadPDF = multer({
  storage: storage,
  fileFilter: pdfFilter,
});

// Middleware Multer cho upload ảnh
const upload_image = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = { upload_image, uploadPDF };
