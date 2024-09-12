const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncError=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary=require('cloudinary');

// create Product---admin
exports.createProduct = catchAsyncError(async (req, res) => {
    let images = [];
  
    // Handle single or multiple image uploads
    if (typeof req.body.images === 'string') {
      images.push(req.body.images); // Single image
    } else {
      images = req.body.images; // Multiple images
    }
  
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
    
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    // Assign the uploaded image links to the product
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    // Create the product in the database
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  
// get all products
exports.getAllProducts=catchAsyncError(async(req,res)=>{

    const resultPerPage = 4;
 let productscount=await Product.countDocuments();

    // Apply search and filter without executing the query
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
    
    // Clone the query for counting filtered products
    let filteredProductsCount = await apiFeature.query.clone().countDocuments();
    
    // Apply pagination to the original query
    apiFeature.pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productscount,
        resultPerPage,
        filteredProductsCount,
    })
})
// get product details
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product Not Found",404))
    }
    res.status(200).json({
        success: true,
        product
    });

    
}
)
// update product--admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product Not Found",404))
    }
    let images=[];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
      if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } req.body.images = imagesLinks;
}
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})
// delete product--admin
 exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product Not Found",404))
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Product removed successfully"
    });
}
)
// create a new review or update
exports.createProductReview=catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review={
        user:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,

    }
    const product=await Product.findById(productId);
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),(rev.comment=comment);
        });
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews=product.reviews.length;

    }
    let avg=0;
    product.reviews.forEach(rev=>{
        (avg+=rev.rating);
    });
    product.ratings=avg/product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    }) 
})

// to get all reviews of single product
exports.getProductReviews=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
})

// delete review
exports.deleteReview=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.query.productId);
   
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
   
    let avg=0;
    reviews.forEach(rev=>{
        (avg+=rev.rating);
    });
    const ratings=reviews.length === 0 ? 0 : avg / reviews.length;
    const numberOfReviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numberOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })    
    res.status(200).json({
        success:true,
    });
})





exports.getAdminProducts=catchAsyncError(async(req,res)=>{

   const products=await Product.find();
    res.status(200).json({
        products,
    })
})




// initial
// const resultPerPage=8;
// let productscount=await Product.countDocuments();

// const apiFeature= new ApiFeatures(Product.find(),req.query)
// .search()
// .filter().pagination(resultPerPage)
// const products=await apiFeature.query;
// let filteredProductsCount = products.length;
