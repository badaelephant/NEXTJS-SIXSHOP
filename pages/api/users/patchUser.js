const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;

  const client = await clientPromise;
  const db = client.db("sixshop");
  const { name, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ _id: id });
    if (user) {
      await db.collection("users").updateOne({ _id: id }, { $set: { name, password } });
      return res.status(200).json({
        success: true,
        msg: "User Info Updated",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Unable to find user with the id",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Unable to update user Info",
    });
  }
};
