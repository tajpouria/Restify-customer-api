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
const restify_errors_1 = __importDefault(require("restify-errors"));
const customer_1 = __importDefault(require("../models/customer"));
exports.default = (server) => {
    server.get("/customers", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const customers = yield customer_1.default.find({});
            res.send(customers);
            next();
        }
        catch (err) {
            return next(new restify_errors_1.default.InvalidContentError(err));
        }
    }));
    server.get("/customers/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield customer_1.default.findById(req.params.id);
            res.send(customer);
            next();
        }
        catch (err) {
            return next(new restify_errors_1.default.ResourceNotFoundError(`There is no resources by id ${req.params.id}`));
        }
    }));
    server.post("/customers", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.is("application/json")) {
            return next(new restify_errors_1.default.InvalidContentError("Provided Content should be JSON"));
        }
        const { name, surname, balance } = req.body;
        try {
            const customer = new customer_1.default({ name, surname, balance });
            const newCustomer = yield customer.save();
            next(newCustomer);
        }
        catch (err) {
            return next(new restify_errors_1.default.InternalServerError(err));
        }
    }));
    server.put("/customers/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.is("application/json")) {
            return next(new restify_errors_1.default.InvalidContentError("Provided Content should be JSON"));
        }
        try {
            yield customer_1.default.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(201);
            next();
        }
        catch (err) {
            return next(new restify_errors_1.default.ResourceNotFoundError(`There is no resource by id : ${req.params.id}`));
        }
    }));
    server.del("/customers/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield customer_1.default.findOneAndRemove({
                _id: req.params.id
            });
            res.send(204);
            next();
        }
        catch (err) {
            return next(new restify_errors_1.default.ResourceNotFoundError(`There is no resource by id : ${req.params.id}`));
        }
    }));
};
//# sourceMappingURL=customers.js.map