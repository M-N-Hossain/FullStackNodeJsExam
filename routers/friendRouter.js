import { Router } from "express";
import dbConnection from "../database/connection.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/friends", (req, res) => {
  const token = req.cookies.token;
  const queryForAddFriend =
    "INSERT INTO friends_list  (`user_id`, `friend_id`) VALUES (?,?)";

  const queryForDeleteFriendRequest =
    "DELETE FROM friend_requests where sender_id = ? and receiver_id = ?;";

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      const valuesForFirstExecution = [decoded.user_id, req.body.sender_id];
      dbConnection.query(
        queryForAddFriend,
        valuesForFirstExecution,
        (err, result) => {
          if (err) {
            return res.send({
              Error: "Error in first add friend query execution",
            });
          } else {
            const valuesForSecondExecution = [
              req.body.sender_id,
              decoded.user_id,
            ];
            dbConnection.query(
              queryForAddFriend,
              valuesForSecondExecution,
              (err, result) => {
                if (err) {
                  return res.send({
                    Error: "Error in second add friend query execution",
                  });
                } else {
                  const valuesForDeleteFriendRequest = [
                    req.body.sender_id,
                    decoded.user_id,
                  ];
                  dbConnection.query(
                    queryForDeleteFriendRequest,
                    valuesForDeleteFriendRequest,
                    (err, result) => {
                      if (err) {
                        return res.send({
                          Error:
                            "Error in delete friend request query execution",
                        });
                      } else {
                        return res.send({
                          Status: "Succesfully add to friend list",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

router.get("/friends", (req, res) => {
  const query = `
  SELECT u.user_id, u.name
FROM friends_list f
JOIN users u ON f.friend_id = u.user_id
WHERE f.user_id = ?;
`;
  const token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send({ Error: "Token does not matched" });
    } else {
      const user_id = decoded.user_id;
      dbConnection.query(query, user_id, (req, result) => {
        if (err) {
          return res.send({
            Error: "Error in get friends query execution",
          });
        } else {
          res.send({ friends: result });
        }
      });
    }
  });
});

export default router;
