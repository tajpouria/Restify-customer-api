import jwt from "jsonwebtoken";
import { Server } from "restify";
import errors from "restify-errors";

import config from "../config";
import User from "../models/user";

export default (server: Server) => {
  server.post("/register", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError(
          "Provided content-type must be in JSON format"
        )
      );
    }

    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.send(201);
    } catch (err) {
      return next(new errors.InternalError(err));
    }
  });

  server.post("/auth", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(
        new errors.InvalidContentError(
          "Provided content-type must be in JSON format"
        )
      );
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      await user.comparePassword(
        password,
        (err: Error | null, isMatch?: boolean) => {
          if (err) {
            return next(new errors.InternalServerError(err));
          }
          if (isMatch) {
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
              expiresIn: "15m"
            });

            res.send({ token });
          } else {
            return next(new errors.UnauthorizedError("Unauthorized user"));
          }
        }
      );
    } catch (err) {
      return next(new errors.UnauthorizedError("Unauthorized user"));
    }
  });
};
