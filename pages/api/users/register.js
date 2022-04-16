const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const userId = `userId-${new Date().valueOf()}`;
  const { name, role } = req.body;
  console.log("role", role);
  if (role == "") {
    return res.status(400).json({
      success: false,
      msg: "Please select role between owner and customer",
    });
  }
  if (role !== "owner" && role !== "customer") {
    return res.status(400).json({
      success: false,
      msg: "Please select role between owner and customer",
    });
  }
  try {
    const user = await db.collection("users").findOne({ name, role });
    console.log("user==>", user);
    if (user) {
      console.log("userexist==>");
      return res.status(404).json({
        success: false,
        msg: "Same user with name and role exists",
      });
    } else {
      console.log("user noexist==>", { _id: userId, ...req.body });
      await db.collection("users").insertOne({ _id: userId, ...req.body });
      console.log("insert succeed==>");
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
