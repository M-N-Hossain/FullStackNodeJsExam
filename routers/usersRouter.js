import { Router } from "express";
import dbConnection from "../database/connection.js";
import Jwt from "jsonwebtoken";

const router = Router();

router.get("/users", (req, res) => {
  const token = req.cookies.token;
  const query = "SELECT user_id, name FROM users WHERE user_id != ?";

  Jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      dbConnection.query(query, [decode.user_id], (err, result) => {
        if (err) {
          return res.status(500).send({ Error: err });
        } else {
          res.send({ users: result });
        }
      });
    }
  });
});

export default router;