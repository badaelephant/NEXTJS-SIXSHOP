const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const userId = `userId-${new Date().valueOf()}`;
  const { name, role } = req.body;
  if (role !== "owner" || role !== "customer" || role == "") {
    return res.status(400).json({
      success: false,
      msg: "Please select role between owner and customer",
    });
  }
  try {
    const user = await db.collection("users").findOne({ name, role });
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Same user with name and role exists",
      });
    } else {
      await db.collection("users").insertOne({ _id: userId, ...req.body });
      return res.status(200).json({
        success: true,
        msg: "New User Created",
        _id: userId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
