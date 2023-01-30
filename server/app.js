const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const authRoutes = require("./Routes/authRoutes.js");
const reset_forgotPasswordRoute = require("./Routes/reset_forgotPasswordRoute.js")
const dotenv = require('dotenv');
const cors = require("cors");
const feedRoutes = require("./Routes/feedRoutes.js") ;
const bodyParser = require("body-parser")
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", function () {
  console.log("Database connected successfully");
});

const PORT = process.env.PORT || 3001

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use('/api', reset_forgotPasswordRoute);

// Homepage feed api 
app.use("/api/feed", feedRoutes)

server.listen(PORT, () => {
  console.log(`Port is running at ${PORT}`);
});

