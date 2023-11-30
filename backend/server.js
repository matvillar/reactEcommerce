import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import prodRoutes from './routes/product-routes.js';
connectDB(); // connect to database(mongodb)

const port = process.env.PORT || 6000;
const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// product routes
app.use('/api/products', prodRoutes);

app.use(notFound); // not found middleware
app.use(errorHandler); // error handler middleware
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
