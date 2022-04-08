import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = new mongoose.Schema({
  store: ObjectId,
  status: String,
  customer: ObjectId,
  price: Number,
  orders: [
    {
      type: ObjectId,
    },
  ],
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
