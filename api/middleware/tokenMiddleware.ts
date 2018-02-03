import * as jwt from "jsonwebtoken";

import User from "../src/models/user";

const reject = (res, status, message) => {
  return res.status(status).json({
    message,
    success: false,
  });
};

const checkToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        return reject(res, 401, "Failed to authenticate token.");
      }

      User.find({ _id: decoded._id }, (lookupErr, [ user ]) => {
        if (lookupErr || !user) {
          return reject(res, 401, "Cannot find user.");
        }

        req.user = user;
        next();
      });
    });

  } else {
    return reject(res, 403, "No token provided.");
  }
};

export default checkToken;