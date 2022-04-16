const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const { status } = req.body;

    const createdOrder = await db.collection("orders").updateOne({ _id: id }, { $set: { status: "ACCEPTED" } });
    return res.status(200).json({
      success: true,
      msg: "Order Accepted",
      data: createdOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
