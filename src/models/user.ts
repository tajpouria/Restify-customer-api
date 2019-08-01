import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";
import timestamp from "mongoose-timestamp";

export interface IUserDocument extends Document {
  email: string;
  password: string;
}

export interface IUser extends Document, IUserDocument {
  comparePassword(
    password: string,
    cb: (err: Error | null, isMatch?: boolean) => void
  ): boolean;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true }
});

userSchema.pre("save", function(
  this: IUserDocument,
  next: (err?: Error) => void
) {
  const user = this;
  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(
  candidatePassword: string,
  cb: (err: Error | null, isMatch?: boolean) => void
) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.plugin(timestamp);

export const User = mongoose.model<IUser>("User", userSchema);

export default User;
