const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const userId = req.query.userId;
  const client = await clientPromise;
  const db = client.db("sixshop");
  console.log("userId", userId);
  try {
    let shops;
    if (!userId) {
      shops = await db.collection("shops").find({}).toArray();
      return res.status(200).json({
        success: true,
        msg: "Shop Info Searched!!",
        data: {
          shops,
        },
      });
    } else {
      const user = await db.collection("users").findOne({ _id: userId });
      if (user && user.role == "owner") {
        shops = await db.collection("shops").find({ ownerId: userId }).toArray();
        return res.status(200).json({
          success: true,
          msg: "Shop Info Searched!!",
          data: {
            shops,
          },
        });
      } else {
        return res.status(400).json({ success: false, msg: `It is not matching userId or not OwnerId` });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
