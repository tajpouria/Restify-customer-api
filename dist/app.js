"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restify_1 = __importDefault(require("restify"));
const config_1 = __importDefault(require("./config"));
const customers_1 = __importDefault(require("./routes/customers"));
const { PORT, mongo_db_uri } = config_1.default;
const server = restify_1.default.createServer();
server.use(restify_1.default.plugins.bodyParser());
server.listen(PORT, () => {
    mongoose_1.default.set("useFindAndModify", false);
    mongoose_1.default.connect(mongo_db_uri, { useNewUrlParser: true });
});
const db = mongoose_1.default.connection;
db.once("open", () => {
    customers_1.default(server);
    console.info(`Server is listening on port ${PORT} ...`);
});
db.once("error", err => new Error(err.message));
//# sourceMappingURL=app.js.map