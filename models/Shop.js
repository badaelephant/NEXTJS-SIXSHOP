import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: String,
  owner: String,
  location: String,
});

export const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
