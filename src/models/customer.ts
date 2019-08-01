import mongoose, { Document, Schema } from "mongoose";
import timestamp from "mongoose-timestamp";

export interface ICustomer extends Document {
  balance: string;
  name: string;
  surname: string;
}

const customerSchema: Schema = new Schema({
  balance: { type: Number, default: 0 },
  name: { type: String, min: 3, max: 50, required: true },
  surname: { type: String, min: 3, max: 50, required: true }
});

customerSchema.plugin(timestamp);

export default mongoose.model<ICustomer>("Customer", customerSchema);
