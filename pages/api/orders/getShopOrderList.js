const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const id = req.params.id; //shopId
  try {
    const shop = await db.collection("shops").findOne({ _id: id });
    if (shop) {
      const orders = await db.collection("orders").find({ store: id }).toArray();
      return res.status(200).json({
        success: true,
        data: orders,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "no shop with id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
