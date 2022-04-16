const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");
  try {
    const { fieldName } = req.body;
    const findCustom = await db.collection("customs").findOne({ _id: id });
    if (findCustom) {
      const updatedCustom = await db.collection("customs").updateOne({ _id: id }, { $set: { fieldName } });
      if (updatedCustom.result?.ok === 1) {
        const field = {};
        field[findCustom.fieldName] = fieldName;
        const updated = await db.collection(findCustom.collectionName).updateMany({ store: findCustom.store }, { $rename: field });
        if (updated) {
          return res.status(200).json({
            success: true,
            msg: "Custom has been updated",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
