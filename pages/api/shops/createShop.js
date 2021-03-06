const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const shopId = `shop-${new Date().valueOf()}`;
  try {
    const createdShop = await db.collection("shops").insertOne({ _id: shopId, ...req.body });
    return res.status(200).json({
      success: true,
      msg: "New Shop Created",
      data: shopId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
