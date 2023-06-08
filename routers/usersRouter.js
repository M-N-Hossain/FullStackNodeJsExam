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

router.get("/users/:user_id", (req, res) => {
  const token = req.cookies.token;
  const query = `SELECT * FROM users WHERE user_id = ?`;

  Jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      dbConnection.query(query, req.params.user_id, (err, result) => {
        if (err) {
          return res.status(500).send({
            Error:
              "Can't find the user with this user_id " + req.params.user_id,
          });
        } else {
          res.send({ data: result });
        }
      });
    }
  });
});

router.get("/usersProfileName", (req, res) => {
  const token = req.cookies.token;
  const query = `SELECT user_id, name FROM users WHERE user_id = ?`;
  Jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      dbConnection.query(query, decode.user_id, (err, result) => {
        if (err) {
          return res.send({ Error: err });
        } else {
          res.send({ data: result });
        }
      });
    }
  });
});

router.put("/users/:user_id", (req, res) => {
  const token = req.cookies.token;
  const query = `UPDATE users SET email = ?, username = ?, name = ? WHERE user_id = ?`;
  Jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      const values = [
        req.body.email,
        req.body.username,
        req.body.name,
        decode.user_id,
      ];
      dbConnection.query(query, values, (err, result) => {
        if (err) {
          return res.send({ Error: err });
        } else {
          res.send({ data: "Updated" });
        }
      });
    }
  });
});

export default router;
