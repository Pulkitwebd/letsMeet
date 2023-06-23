const authSocket = require("./middleware/authSocket.js");
const newConnectionHandler = require("./socketHandler/newConnectionHandler.js")
const disconnectHandler = require("./socketHandler/disconnect.js")
const serverStore = require("./serverStore.js")

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("user connected"), console.log(socket.id);

    newConnectionHandler(socket, io)

    socket.on("disconnect", () => {
      disconnectHandler(socket)
    })
  });
};

module.exports = {
  registerSocketServer,
};
