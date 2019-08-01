export default {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PORT: process.env.PORT || 3000,
  mongo_db_uri: "mongodb://localhost/restify_customers"
};
