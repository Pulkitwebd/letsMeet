const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/authRoutes.js");
const reset_forgotPasswordRoute = require("./Routes/reset_forgotPasswordRoute.js")
const feedRoutes = require("./Routes/feedRoutes.js") ;
const blogRoutes = require("./Routes/blogRoutes.js");
const socketServer = require("./socketServer.js");
const FriendInvitationRoutes = require("./Routes/friendRoutes.js")


const app = express();
const server = http.createServer(app);
socketServer.registerSocketServer(server);


const PORT = process.env.PORT || 3001

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());
app.use(cors());

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

app.use("/api/auth", authRoutes);
app.use('/api', reset_forgotPasswordRoute);

// Homepage feed api paths
app.use("/api/feed", feedRoutes)

// Blog api paths
app.use("/api/blog", blogRoutes)

//friend 
app.use("/api/friend-invitation" , FriendInvitationRoutes)

server.listen(PORT, () => {
  console.log(`Port is running at ${PORT}`);
});
