const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  update,
  remove,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch,
  bulkUpload
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin, } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { sendProductName } = require('../middleware/product');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  sendProductName,
  remove
);

router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  sendProductName,
  update
);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);
router.get('/product/saleReport', photo);
router.post('/product/bulkupload', bulkUpload);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
