const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const shopId = req.query.shopId;
  const client = await clientPromise;
  const db = client.db("sixshop");
  console.log("shopId", shopId);
  let customs;
  if (shopId) {
    try {
      customs = await db.collection("customs").find({ store: shopId }).toArray();

      return res.status(200).json({
        success: true,
        msg: "customs search success",
        data: {
          customs,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  } else {
    try {
      customs = await db.collection("customs").find().toArray();
      return res.status(200).json({
        success: true,
        msg: "customs search success",
        data: {
          customs,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  }
};
