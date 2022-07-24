const express = require('express');
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const mongoose = require('mongoose');
const cors = require('cors');


const products = require("../models/product");


mongoose
  .connect("mongodb://127.0.0.1:27017/Shop_DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const app = express();
const port = 7789;
app.use(express.json())
app.use(cors());


app.post('/bulkUpload', (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'file could not be uploaded',
      });
    }
    console.log(files.file)
    csvtojson()
      .fromFile(files.file.filepath)
      .then(csvData => {
        products.insertMany(csvData, (err, rest) => {
          console.log(err)
          if (err) { return res.send({ message: err }) }
          console.log(`Inserted: ${rest.insertedCount} rows`);
          res.send("Products uploaded Successfully")
        });
      }
      );
  })
})


app.post('/salereport', (req, res) => {
  const { fromDate, toDate } = req.body;
  var prevDate = fromDate + "T17:16:22.865+00:00"
  var nextDate = toDate + "T17:16:22.865+00:00"

  products.find({ $and: [{ createdAt: { $gte: new Date(prevDate), $lte: new Date(nextDate) } }, { sold: { $gt: 0 } }] })
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      res.send(products);

    });
})

app.get('/stocks', (req, res) => {

  products.find()
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      res.send(products);
    });
})




app.listen(port, () => {
  console.log('Up and Running on port :', port);
})