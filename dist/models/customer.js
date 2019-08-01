"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const customerSchema = new mongoose_1.Schema({
    balance: { type: Number, default: 0 },
    name: { type: String, min: 3, max: 50, required: true },
    surname: { type: String, min: 3, max: 50, required: true }
});
customerSchema.plugin(mongoose_timestamp_1.default);
exports.default = mongoose_1.default.model("Customer", customerSchema);
//# sourceMappingURL=customer.js.map