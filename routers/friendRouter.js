import { Router } from "express";
import dbConnection from "../database/connection.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/sentFriendRequests", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send({Error: "Token does not matched"});
    }
    try {
      const senderId = decoded.user_id;
      const receiverId = req.body.receiver_id;

      // Check if a friend request already exists between the sender and receiver
      dbConnection.query(
        "SELECT * FROM friend_requests WHERE sender_id = ? AND receiver_id = ?",
        [senderId, receiverId],
        (err, existingRows) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred" });
          }

          if (existingRows.length > 0) {
            return res
              .status(400)
              .json({ message: "Friend request already sent" });
          }

          // Insert the friend request into the friend_requests table
          dbConnection.query(
            "INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)",
            [senderId, receiverId],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred" });
              }
              res.json({ message: "Friend request sent" });
            }
          );
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  });
});

export default router;
