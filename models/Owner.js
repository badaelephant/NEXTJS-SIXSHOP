import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const ownerSchema = new mongoose.Schema({
  store: ObjectId,
  name: String,
  email: String,
  password: String,
});

export const Owner = mongoose.models.Owner || mongoose.model("Owner", ownerSchema);
