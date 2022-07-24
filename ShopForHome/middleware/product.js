const Product = require('../models/product');


exports.sendProductName = async (req,res, next) =>{
    var productName;
    // console.log(req.product)
    await Product.findById(req.product.id).exec((err,data)=>{
      if(err){
        res.send({error:err})
      }
      productName=data.imagename;
      console.log(productName)
      // console.log(data)
      req.productName=productName;
      next();
    })
    
  
  }