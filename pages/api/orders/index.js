import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const orderId = `order-${new Date().valueOf()}`;

  switch (method) {
    case "POST":
      const { customer, store } = req.body;
      try {
        const createdOrder = await db.collection("orders").insertOne({ _id: orderId, ...req.body });
        if (createdOrder) {
          const user = await db.collection("users").findOne({ _id: customer });
          await db
            .collection("customers")
            .update(
              { _id: user._id, store },
              { _id: user._id, store, name: user.name, email: user.email, password: user.password },
              { upsert: true }
            );
        }
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
