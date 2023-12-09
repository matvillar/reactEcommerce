import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import prodRoutes from './routes/product-routes.js';
import userRoutes from './routes/user-routes.js';
import orderRoutes from './routes/order-routes.js';
import path from 'path';
connectDB(); // connect to database(mongodb)

const port = process.env.PORT || 6000;
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// product routes
app.use('/api/products', prodRoutes);
// user routes
app.use('/api/users', userRoutes);
// order routes
app.use('/api/orders', orderRoutes);

// paypal client id route
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
}

app.use(notFound); // not found middleware
app.use(errorHandler); // error handler middleware
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
