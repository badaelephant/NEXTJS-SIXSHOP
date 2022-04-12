import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const orderId = `order-${new Date().valueOf()}`;

  switch (method) {
    case "POST":
      try {
        const createdOrder = await db.collection("orders").insertOne({ _id: orderId, ...req.body });
        return res.status(200).json({
          success: true,
          msg: "New Order Created",
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
