const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");
  try {
    const findCustom = await db.collection("customs").find({ store: id }).toArray();
    return res.status(200).json({
      success: true,
      msg: "customs search success",
      data: findCustom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
