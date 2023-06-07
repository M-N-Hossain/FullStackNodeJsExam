import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import fs from "fs";
import jwt from "jsonwebtoken";
import dbConnection from "./database/connection.js";

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

io.on("connection", (socket) => {
  socket.on("connected", (data) => {
    let { messageReceiverId } = data;
    if (!messageReceiverId) {
      console.log("No receiver");
    } else {
      console.log(messageReceiverId);
      socket.on("sendMessage", (data) => {
        let { message } = data;
        const query = " SELECT * FROM users WHERE user_id = ?";
        dbConnection.query(query, messageReceiverId, (err, receiver) => {
          if (err) {
            console.log("Error:", err);
          } else {
            if (receiver === 0) {
              console.log("No receiver");
              console.log(messageReceiverId);
            } else {
              messageReceiverId = socket.id;
              socket.broadcast.emit("messageReceived", message);
            }
          }
        });
      });
    }
  });

  // socket.on("sendMessage", (data) => {
  //   let { messageReceiverId, message } = data;
  //   if (messageReceiverId) {
  //     const query = " SELECT * FROM users WHERE user_id = ?";
  //     messageReceiverId = socket.id;
  //     dbConnection.query(query, messageReceiverId, (err, receiver) => {
  //       if (err) {
  //         console.log("Error:", err);
  //       } else {
  //         if (receiver === 0) {
  //           console.log("No receiver");
  //           console.log(messageReceiverId);
  //         } else {
  //           socket.broadcast.emit("messageReceived", message);
  //         }
  //       }
  //     });
  //   }
  //   // if (id === socket.id) {
  //   //   socket.broadcast.emit("messageReceived", message);
  //   // } else {
  //   //   console.log("Socket id is not matched");
  //   // }
  // });
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
