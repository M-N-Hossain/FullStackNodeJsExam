import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import fs from "fs";
import jwt from "jsonwebtoken";

import http from "http";
import { Server } from "socket.io";

import userAuthenticationRouter from "./routers/authenticationRouter.js";
import userAuthorizationRouter from "./routers/authorizationRoutes.js";
import postsRoter from "./routers/postsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import friendRequestRouter from "./routers/friendRequestRouter.js";
import friendRouter from "./routers/friendRouter.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

// this middleware is a body parser that will parse form data
app.use(urlencoded({ extended: true }));

app.use(userAuthenticationRouter);
app.use(userAuthorizationRouter);
app.use(postsRoter);
app.use(usersRouter);
app.use(friendRequestRouter);
app.use(friendRouter);

// Message
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("chatMessage", data);
  });
});

// Declare function for read page from the file path
function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}
const welcomePage = readPage("public/pages/welcomePage/welcomePage.html");

// PAGES
app.get("/", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect("/feed");
  }
  res.send(welcomePage);
});

//Instantiating port
const PORT = process.env.PORT || 8080;

server.listen(PORT, (err) => {
  if (err) return console.log(err);
  return console.log("Server is running on PORT ", PORT);
});
