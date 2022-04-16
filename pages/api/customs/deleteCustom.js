const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const id = req.params.id;
  const client = await clientPromise;
  const db = client.db("sixshop");

  try {
    const findCustom = await db.collection("customs").findOne({ _id: id });
    if (findCustom) {
      const deletedCustom = await db.collection("customs").deleteOne({ _id: id });
      if (deletedCustom) {
        const field = {};
        field[findCustom.fieldName] = "";
        const deleted = await db.collection(findCustom.collectionName).updateMany({ store: findCustom.store }, { $unset: field });
        if (deleted) {
          return res.status(200).json({
            success: true,
            msg: "Custom has been deleted",
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
