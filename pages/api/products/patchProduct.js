const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  console.log("patchProduct");
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
    console.log("productResult", productResult);
    if (productResult) {
      console.log("field", field);
      await db.collection("products").updateOne({ _id: id }, { $set: field });
      return res.status(200).json({
        success: true,
        msg: "Product Updated",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "There are No Product",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
