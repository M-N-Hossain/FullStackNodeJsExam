import { Router } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnection from "../database/connection.js";

const router = Router();

// Sign up route
router.post("/signup", (req, res) => {
  const query = "INSERT INTO users (`email`,`username`,`password`, `name`) VALUES (?)";
  // Hashing password
  bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
    if (err) {
      return res.status(404).send({ Error: "Error in hashing password" });
    } else {
      const values = [req.body.email, req.body.username, hashedPassword , req.body.username];
      dbConnection.query(query, [values], (err, data) => {
        if (err) {
          return res
            .status(404)
            .send({ Error: "email or username is already existed" });
        } else {
          return res.send({ Status: "a new user signed up" });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  // Can't find with the password as pasdword is encrypted in the database
  const query = "SELECT * FROM users WHERE username = ?";

  dbConnection.query(query, [req.body.username], (err, data) => {
    if (err) {
      return res
        .status(404)
        .send({ Error: "An error occured in sql execution" });
    } else if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, response) => {
        if (err) return res.send({ Error: "hashed password compare error" });
        else if (response) {
          // Generating jwt token and add the user object with token
          const jwtoken = Jwt.sign(data[0], process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
          console.log(data[0]);
          // sending token as cookie
          res.cookie("token", jwtoken);
          res.send({ Status: "user logged in" });
        } else {
          res.send({ Error: "password does not matched" });
        }
      });
    } else {
      res.status(404).send({ Error: "username is not exist" });
    }
  });
});

export default router;
