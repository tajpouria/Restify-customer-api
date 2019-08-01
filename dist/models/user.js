"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true }
});
userSchema.pre("save", function (next) {
    const user = this;
    bcryptjs_1.default.genSalt(10, (saltErr, salt) => {
        if (saltErr) {
            return next(saltErr);
        }
        bcryptjs_1.default.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) {
                return next(hashErr);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    const user = this;
    bcryptjs_1.default.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
userSchema.plugin(mongoose_timestamp_1.default);
exports.User = mongoose_1.default.model("User", userSchema);
exports.default = exports.User;
//# sourceMappingURL=user.js.map