import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");

  switch (method) {
    case "PATCH":
      try {
        const { status } = req.body;
        const field = {};
        field["status"] = status;
        const createdOrder = await db.collection("orders").updateOne({ _id: id }, { $set: field });
        return res.status(200).json({
          success: true,
          msg: "Order Status Updated",
          data: createdOrder,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    default:
      break;
  }
}
