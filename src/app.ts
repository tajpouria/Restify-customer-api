import mongoose from "mongoose";
import restify from "restify";
import rjwt from "restify-jwt-community";

import config from "./config";
import customers from "./routes/customers";
import users from "./routes/users";

const { PORT, mongo_db_uri, JWT_SECRET } = config;

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

// Protect all route except "/auth"
server.use(rjwt({ secret: JWT_SECRET }).unless({ path: ["/auth"] }));
// also can working as middleware eg.('/auth',rjwt({secret}),(req,res,next))

server.listen(
  PORT,
  (): void => {
    mongoose.set("useFindAndModify", false);
    mongoose.connect(mongo_db_uri, { useNewUrlParser: true });
  }
);

const db = mongoose.connection;

db.once("open", () => {
  customers(server);
  users(server);
});

db.once("error", err => new Error(err.message));
