const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const shopId = req.query.shopId;
  const client = await clientPromise;
  const db = client.db("sixshop");
  console.log("shopId", shopId);
  try {
    let customers;
    if (!shopId) {
      customers = await db.collection("customers").find().toArray();
      return res.status(200).json({
        success: true,
        msg: "All Customers Searched!!",
        data: {
          customers,
        },
      });
    } else {
      const shop = await db.collection("shops").findOne({ _id: shopId });
      console.log(shop);
      if (shop) {
        customers = await db.collection("customers").find({ store: shopId }).toArray();
        return res.status(200).json({
          success: true,
          msg: "Customers Searched!!",
          data: {
            customers,
          },
        });
      } else {
        return res.status(400).json({ success: false, msg: `There are no shop with the same Id` });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
