import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";

import fs from "fs";

import userAuthenticationRouter from "./routers/authenticationRouter.js";
import templateEngine from "./util/templateEngine.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// this middleware is a body parser that will parse form data
app.use(urlencoded({ extended: true }));


app.use(userAuthenticationRouter);

function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}

// Welcome Page
// const welcomeContent = templateEngine.readPage(
//   "./public/pages/welcomeContent.html"
// );
// const welcomePage = templateEngine.renderPage(welcomeContent, {
//   tabTitle: "Welcome",
// });

// Home page
// const homeContent = templateEngine.readPage(
//   "./public/pages/homeContent/homeContent.html"
// );
// const homePage = templateEngine.renderHomePage(homeContent, {
//   tabTitle: "Home Page",
//   cssLink: `<link href="/pages/homeContent/homeContent.css" rel="stylesheet" />`,
// });

const welcomePage = readPage("public/pages/welcomePage/welcomePage.html");

// PAGES
app.get("/welcome", (req, res) => {
  res.send(welcomePage);
});
app.get("/home", (req, res) => {
  res.send(homePage);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  return console.log(
    "Server is running on PORT ",
    PORT,
    "http://localhost:8081/welcome"
  );
});
