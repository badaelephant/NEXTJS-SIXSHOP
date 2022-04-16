const clientPromise = require("../../../middlewares/database");
module.exports = async function handler(req, res) {
  const role = req.query.role;
  const client = await clientPromise;
  const db = client.db("sixshop");
  try {
    let users;
    console.log("role!!", role);
    if (role === "owner") users = await db.collection("users").find({ role: "owner" }).toArray();
    else if (role === "customer") users = await db.collection("users").find({ role: "customer" }).toArray();
    else users = await db.collection("users").find().toArray();

    if (users) {
      return res.status(200).json({
        success: true,
        data: {
          users,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Error occured fetching users",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
