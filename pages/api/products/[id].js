import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;

  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");

  switch (method) {
    case "PATCH":
      try {
        const field = {};
        for (const [key, value] of Object.entries(req.body)) {
          field[key] = value;
        }

        await db.collection("products").updateOne({ _id: id }, { $set: field });
        return res.status(200).json({
          success: true,
          msg: "Order Status Updated",
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
