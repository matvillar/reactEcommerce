import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/database.js';

dotenv.config();

// connect to database
connectDB();

// import data

const importData = async () => {
  try {
    await Order.deleteMany(); // delete all orders
    await Product.deleteMany(); // delete all products
    await User.deleteMany(); // delete all users

    // create users
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id; // get admin user id

    const sampleProds = products.map((prod) => {
      // ...prod means we are getting all the properties(data) of product
      return { ...prod, user: adminUser }; // add admin user id to each product. This is because we want to know which admin user created each product.
    });

    await Product.insertMany(sampleProds); // insert all products

    console.log('Data Imported!'.green.inverse);
    process.exit(); // exit with success
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit with failure
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); // delete all orders
    await Product.deleteMany(); // delete all products
    await User.deleteMany(); // delete all users

    console.log('Data Destroyed!'.red.inverse);
    process.exit(); // exit with success
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit with failure
  }
};

if (process.argv[2] === '-d') {
  console.log('destroy');
  destroyData();
} else {
  console.log('import');
  importData();
}
