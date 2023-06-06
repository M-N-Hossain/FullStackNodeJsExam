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
  const query = `
  SELECT name, post_text FROM posts p JOIN users u ON p.user_id = u.user_id ORDER BY p.post_id;
`;

  dbConnection.query(query, (err, posts) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Error retrieving posts" });
    }

    res.json(posts);
  });
});

router.get("/posts/:username", (req, res) => {
  const query = `
  SELECT name, post_text
FROM  users u
JOIN posts p ON p.user_id = u.user_id
WHERE u.username = ?;
`;
  const username = req.params.username;
  dbConnection.query(query, username, (err, posts) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Error retrieving posts" });
    }

    res.json(posts);
  });
});

export default router;
