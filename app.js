import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import fs from "fs";

import userAuthenticationRouter from "./routers/authenticationRouter.js";
import userAuthorizationRouter from "./routers/authorizationRoutes.js";
import postsRoter from "./routers/postsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import friendRouter from "./routers/friendRouter.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// this middleware is a body parser that will parse form data
app.use(urlencoded({ extended: true }));

app.use(userAuthenticationRouter);
app.use(userAuthorizationRouter);
app.use(postsRoter);
app.use(usersRouter);
app.use(friendRouter);

function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}

const welcomePage = readPage("public/pages/welcomePage/welcomePage.html");
// PAGES
app.get("/", (req, res) => {
  res.send(welcomePage);
});

//Instantiating port
const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  return console.log("Server is running on PORT ", PORT);
});
