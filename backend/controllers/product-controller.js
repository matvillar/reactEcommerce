import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8; // number of products per page
  const page = Number(req.query.pageNumber) || 1; // get page number from query string or default to 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}; // if keyword exists, find products with name that matches keyword

  const count = await Product.countDocuments({ ...keyword }); // count total number of products
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); // find all products

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // find product by id

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Get Top3 Rated Products

const getTop3Products = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); // find all products and sort by rating

  res.status(200).json(products);
});

// Create a new review
// POST /api/products/:id/reviews

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id); // find product by id

  if (product) {
    // check if user already reviewed product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    // if user has not reviewed product, create new review

    // create new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // add review to product
    product.reviews.push(review);

    // update numReviews
    product.numReviews = product.reviews.length;

    // update rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // save product
    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, createReview, getTop3Products };
