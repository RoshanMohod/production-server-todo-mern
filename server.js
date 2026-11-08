const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require("./middlewares/errorMiddleware");

// Dotenv config
dotenv.config();

// DB Connection
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/v1/user', require("./routes/userRoute"));
app.use('/api/v1/test', require("./routes/testRouter"));

// ERROR HANDLING MIDDLEWARE (Must be placed after all routes)
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`Node Server Running on ${process.env.DEV_MODE} mode on Port no ${PORT}`);
});