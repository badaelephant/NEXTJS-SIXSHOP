import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const productSchema = new mongoose.Schema({
  store: ObjectId,
  name: String,
  price: Number,
  categories: [
    {
      type: ObjectId,
    },
  ],
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
