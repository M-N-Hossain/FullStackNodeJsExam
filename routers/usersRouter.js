import { Router } from "express";
import dbConnection from "../database/connection.js";
import Jwt from "jsonwebtoken";

const router = Router();

router.get("/users", (req, res) => {
  const token = req.cookies.token;
  const query = `
  SELECT user_id, name
  FROM users u
  LEFT JOIN friend_requests fr1 ON (fr1.sender_id = ? AND fr1.receiver_id = u.user_id)
  LEFT JOIN friend_requests fr2 ON (fr2.sender_id = u.user_id AND fr2.receiver_id = ?)
  WHERE u.user_id != ?
    AND fr1.request_id IS NULL
    AND fr2.request_id IS NULL
    AND u.user_id NOT IN (
      SELECT friend_id
      FROM friends_list
      WHERE user_id = ?
    )
`;
  Jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      dbConnection.query(
        query,
        [decode.user_id, decode.user_id, decode.user_id, decode.user_id],
        (err, result) => {
          if (err) {
            return res.status(500).send({ Error: err });
          } else {
            res.send({ users: result });
          }
        }
      );
    }
  });
});

export default router;
