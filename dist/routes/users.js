"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const restify_errors_1 = __importDefault(require("restify-errors"));
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("../models/user"));
exports.default = (server) => {
    server.post("/register", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.is("application/json")) {
            return next(new restify_errors_1.default.InvalidContentError("Provided content-type must be in JSON format"));
        }
        const { email, password } = req.body;
        try {
            const user = new user_1.default({ email, password });
            yield user.save();
            res.send(201);
        }
        catch (err) {
            return next(new restify_errors_1.default.InternalError(err));
        }
    }));
    server.post("/auth", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.is("application/json")) {
            return next(new restify_errors_1.default.InvalidContentError("Provided content-type must be in JSON format"));
        }
        const { email, password } = req.body;
        try {
            const user = yield user_1.default.findOne({ email });
            yield user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return next(new restify_errors_1.default.InternalServerError(err));
                }
                if (isMatch) {
                    const token = jsonwebtoken_1.default.sign(user.toJSON(), config_1.default.JWT_SECRET, {
                        expiresIn: "15m"
                    });
                    res.send({ token });
                }
                else {
                    return next(new restify_errors_1.default.UnauthorizedError("Unauthorized user"));
                }
            });
        }
        catch (err) {
            return next(new restify_errors_1.default.UnauthorizedError("Unauthorized user"));
        }
    }));
};
//# sourceMappingURL=users.js.map