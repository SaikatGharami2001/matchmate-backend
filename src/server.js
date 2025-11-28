require("dotenv").config();

const app = require("./app");
const http = require("http");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const socket = require("socket.io");
const io = socket(server, { cors: { origin: "http://localhost:5174" } });

io.on("connection", (socket) => {
  socket.on("joinChat", () => {});
  socket.on("sendMessage", () => {});
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => console.log(`The server is running in ${PORT}`));

server.on("error", (err) =>
  console.error("Server failed to start:", err.message)
);
