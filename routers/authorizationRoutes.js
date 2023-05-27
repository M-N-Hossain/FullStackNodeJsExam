import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Middleware function to authorize the user with the token that creats by login
function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.send({ Error: "You are not authorized here!" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.send({ Error: "Tokent is not matched" });
      next();
    });
  }
}

router.get("/", verifyUser, (req, res) => {
  res.send({ Status: "user is authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.send({ Status: "user logged out" });
});

export default router;
