const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const customId = `custom-${new Date().valueOf()}`;
  const { store, collectionName, fieldName, fieldType } = req.body;
  const field = {};
  field["store"] = store;
  field["collectionName"] = collectionName;
  field["fieldName"] = fieldName;
  const customResult = await db.collection("customs").findOne(field);
  if (customResult)
    return res.status(200).json({
      success: false,
      msg: "There are custom with same store & collection & fieldName",
    });
  else {
    try {
      const createdCustom = await db.collection("customs").insertOne({ _id: customId, ...req.body });
      const newField = {};
      newField[fieldName] = "";
      if (createdCustom) {
        const updatedCustom = await db.collection(collectionName).updateMany({ store }, { $set: newField });
        if (updatedCustom)
          return res.status(200).json({
            success: true,
            msg: "New Custom Created",
          });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  }
};
