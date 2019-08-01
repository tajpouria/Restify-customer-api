import mongoose from "mongoose";
import restify from "restify";

import config from "./config";
import customers from "./routes/customers";

const { PORT, mongo_db_uri } = config;

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

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
  console.info(`Server is listening on port ${PORT} ...`);
});

db.once("error", err => new Error(err.message));
