const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const shops = await db.collection("shops").find({}).toArray();

    if (shops) {
      return res.status(200).json({
        success: true,
        msg: "Shop Info Searched!!",
        data: {
          shops,
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
