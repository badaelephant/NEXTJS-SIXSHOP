const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const orderId = `order-${new Date().valueOf()}`;

  const { customer, store } = req.body;
  console.log(req.body);
  try {
    const createdOrder = await db.collection("orders").insertOne({ _id: orderId, ...req.body });
    if (createdOrder) {
      const user = await db.collection("users").findOne({ _id: customer });
      console.log(user);
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
};
