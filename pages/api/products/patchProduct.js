const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const field = {};
    let name = "";
    for (const [key, value] of Object.entries(req.body)) {
      if (key == "name") name = value;
      if (key == "store") continue;
      field[key] = value;
    }
    const productResult = await db.collection("products").findOne({ name });
    if (productResult)
      return res.status(400).json({
        success: false,
        msg: "There are product with same name",
      });
    else {
      await db.collection("products").updateOne({ _id: id }, { $set: field });
      return res.status(200).json({
        success: true,
        msg: "Product Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
