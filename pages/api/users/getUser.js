const clientPromise = require("../../../middlewares/database");
module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");
  try {
    const user = await db.collection("users").findOne({ _id: id });

    if (user) {
      const shops =
        user.role == "owner" ? await db.collection("shops").find({ ownerId: id }).toArray() : await db.collection("shops").find().toArray();
      return res.status(200).json({
        success: true,
        data: {
          user,
          shops,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "There are No User with the id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
