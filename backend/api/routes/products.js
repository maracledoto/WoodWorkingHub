const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    
    const fileExt = path.extname(file.originalname);
    
    const currentDate = new Date().toISOString().replace(/[-:.]/g, '').replace('T', '').split('.')[0];
    
    const filename = `IMG${currentDate}${fileExt}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require("../models/product");

router.get("/", ProductsController.products_get_all);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.products_create_products);

router.get("/:productId",ProductsController.products_get_one);

router.patch("/:productId", checkAuth, ProductsController.products_update_products );

router.delete("/:productId", checkAuth, ProductsController.products_delete_products);

module.exports = router;