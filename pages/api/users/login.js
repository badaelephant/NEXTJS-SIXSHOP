const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  if (role !== "owner" || role !== "customer" || role == "") {
    return res.status(400).json({
      success: false,
      msg: "Please select role between owner and customer",
    });
  }
  try {
    const { email, role, password } = req.body;
    console.log({ email, role, password });
    const user = await db.collection("users").findOne({ email, role, password });

    if (user) {
      return res.status(200).json({
        success: true,
        msg: "Login Succeed",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "No User with same email, role, password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
