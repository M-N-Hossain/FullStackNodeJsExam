import { Router } from "express";
import dbConnection from "../database/connection.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/posts", (req, res) => {
  const query = "INSERT INTO posts (`user_id`, `post_text`) VALUES (?)";
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/");
    } else {
      const user_id = decoded.user_id;
      const values = [user_id, req.body.post_text];
      dbConnection.query(query, [values], (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ Error: "Error in submit post execution" });
        } else {
          return res.send({ Status: "Successfully submit a post" });
        }
      });
    }
  });
});

router.get("/posts", (req, res) => {
    const query = "SELECT name, post_text FROM users u, posts p where p.user_id = u.user_id";
    
    dbConnection.query(query, (err, posts) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Error retrieving posts" });
      }
  
      res.json(posts);
    });
  });

export default router;
