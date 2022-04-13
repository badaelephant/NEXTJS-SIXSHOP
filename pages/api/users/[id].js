import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const userId = `userId-${new Date().valueOf()}`;
  switch (method) {
    case "PATCH":
      try {
        await db.collection("users").updateOne({ _id: id }, { $set: { ...req.body } });
        return res.status(200).json({
          success: true,
          msg: "User Info Updated",
        });
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
