const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors');
const connectDB = require('./config/db');

//new config
dotenv.config()

//DB CONNECTION
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

//routes
app.use('/api/v1/user' ,require("./routes/userRoute"));
app.use('/api/v1/test' ,require("./routes/testRouter"));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running on  ${ process.env.DEV_MODE} mode on Port no ${PORT}`
   );
});