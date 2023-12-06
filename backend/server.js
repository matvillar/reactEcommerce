import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import prodRoutes from './routes/product-routes.js';
import userRoutes from './routes/user-routes.js';
connectDB(); // connect to database(mongodb)

const port = process.env.PORT || 6000;
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// product routes
app.use('/api/products', prodRoutes);
// user routes
app.use('/api/users', userRoutes);

app.use(notFound); // not found middleware
app.use(errorHandler); // error handler middleware
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
