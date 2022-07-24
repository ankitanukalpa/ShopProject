const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs').promises;;
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fileUpload = require('express-fileupload')
const path = require('path');
const csvtojson = require("csvtojson");

const PORT = process.env.PORT || 5000;

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {


  const { name, description, price, category, quantity, shipping } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !quantity ||
    !shipping
  ) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }


  let uploadFile = req.files.photo;
  let product = new Product(req.body);
  const imageUrl = `http://localhost:${PORT}/images/${uploadFile.name}`;
  product.imagename = uploadFile.name;
  product.imageurl = imageUrl;


  uploadFile
    .mv(path.join(__dirname, '../public', 'images', uploadFile.name))
    .then(() => {

      product.save((err, result) => {
        if (err) {
          console.log('PRODUCT CREATE ERROR ', err);
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });

    })
    .catch((error) => console.log(error));



};

exports.remove = async (req, res) => {
  let product = req.product;
  console.log(req.product.id)

  console.log(req.productName);
  await fs.unlink(`./public/images/${req.productName}`, function (err) {
    if (err) return console.log(err);
    console.log('file deleted successfully');
  });

  await product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Product deleted successfully',
    });
  });


};

exports.update = async (req, res) => {


  let product = req.product;
  product = _.extend(product, req.body);



  if (req.files != null) {
    console.log(req.product)
    let uploadFile = req.files.photo;
    const imageUrl = `http://localhost:${PORT}/images/${uploadFile.name}`;
    product.imagename = uploadFile.name;
    product.imageurl = imageUrl;

    console.log(req.productName);
    await fs.unlink(`./public/images/${req.productName}`, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
    uploadFile
      .mv(path.join(__dirname, '../public', 'images', uploadFile.name))
      .then(() => {

        product.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          }
          res.json(result);
        });

      })
      .catch((error) => console.log(error));

  }
  else {
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });

  }



};



exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json(products);
    });
};



exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories not found',
      });
    }
    res.json(categories);
  });
};


exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};


  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {

  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
  
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select('-photo');
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update product',
      });
    }
    next();
  });
};


exports.bulkUpload = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  console.log("inside")
  // console.log(form)
  form.parse(req, (err, fields, files) => {
    console.log(files.file)
    console.log("inside")
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: err,
      });
    }
    
    
    csvtojson()
      .fromFile(files.file.filepath)
      .then(csvData => {

        Product.insertMany(csvData, (err, rest) => {
          if (err) { return res.send({ message: err }) }
          console.log(`Inserted: ${rest.insertedCount} rows`);
          res.send("Products uploaded Successfully")
        });
      }
      );
  })
}