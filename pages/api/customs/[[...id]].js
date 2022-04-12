import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const customId = `custom-${new Date().valueOf()}`;
  switch (method) {
    case "POST":
      const { store, collectionName, fieldName, fieldType } = req.body;
      console.log({ store, collectionName, fieldName, fieldType });
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
    case "PATCH":
      try {
        const { fieldName } = req.body;
        const findCustom = await db.collection("customs").findOne({ _id: id[0] });
        console.log("findCustom", findCustom);
        if (findCustom) {
          const updatedCustom = await db.collection("customs").updateOne({ _id: id[0] }, { $set: { fieldName } });
          console.log("updatedCustom", updatedCustom);
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
    case "DELETE":
      try {
        console.log("id", id);
        const findCustom = await db.collection("customs").findOne({ _id: id[0] });
        console.log("findCustom", findCustom);
        if (findCustom) {
          const deletedCustom = await db.collection("customs").deleteOne({ _id: id[0] });
          console.log("deletedCustom", deletedCustom);
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
    case "GET":
      try {
        const findCustom = await db.collection("customs").findOne({ _id: id });
        if (findCustom) {
          const deletedCustom = await db.collection("customs").remove({ _id: id });
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
    default:
      break;
  }
}
