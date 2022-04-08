import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const customerSchema = new mongoose.Schema({
  store: ObjectId,
  name: String,
  email: String,
  password: String,
});

export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
