const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const shop = await db.collection("shops").findOne({ _id: id });

    if (shop) {
      const customers = await db.collection("customers").find({ store: id }).toArray();
      const products = await db.collection("products").find({ store: id }).toArray();
      const orders = await db.collection("orders").find({ store: id }).toArray();
      const customs = await db.collection("customs").find({ store: id }).toArray();

      return res.status(200).json({
        success: true,
        data: {
          shop,
          customers,
          products,
          orders,
          customs,
        },
      });
    } else return res.status(400).json({ success: false, msg: `There is no Shop` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
