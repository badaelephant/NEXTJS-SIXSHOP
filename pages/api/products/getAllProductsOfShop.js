const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const shop = await db.collection("shops").findOne({ _id: id });
    if (shop) {
      const productResult = await db.collection("products").find({ store: id }).toArray();
      return res.status(200).json({
        success: true,
        data: productResult,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "There are no shop with the shopId",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
