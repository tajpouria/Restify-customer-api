"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restify_1 = __importDefault(require("restify"));
const restify_jwt_community_1 = __importDefault(require("restify-jwt-community"));
const config_1 = __importDefault(require("./config"));
const customers_1 = __importDefault(require("./routes/customers"));
const users_1 = __importDefault(require("./routes/users"));
const { PORT, mongo_db_uri, JWT_SECRET } = config_1.default;
const server = restify_1.default.createServer();
server.use(restify_1.default.plugins.bodyParser());
// Protect all route except "/auth"
server.use(restify_jwt_community_1.default({ secret: JWT_SECRET }).unless({ path: ["/auth"] }));
// also can working as middleware eg.('/auth',rjwt({secret}),(req,res,next))
server.listen(PORT, () => {
    mongoose_1.default.set("useFindAndModify", false);
    mongoose_1.default.connect(mongo_db_uri, { useNewUrlParser: true });
});
const db = mongoose_1.default.connection;
db.once("open", () => {
    customers_1.default(server);
    users_1.default(server);
});
db.once("error", err => new Error(err.message));
//# sourceMappingURL=app.js.map