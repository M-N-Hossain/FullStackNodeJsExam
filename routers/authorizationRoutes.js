import { Router } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

const router = Router();

// Middleware function to authorize the user with the token that creats by login
function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.redirect("/");
      next();
    });
  }
}

// Declare function for read page from the file path
function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}

// Pages
const feedPage = readPage("public/pages/feedPage/feedPage.html");

router.get("/feed", verifyUser, (req, res) => {
  res.send(feedPage);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.send({ Status: "token is deleted" });
});

export default router;
