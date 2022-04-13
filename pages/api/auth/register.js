import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const userId = `userId-${new Date().valueOf()}`;
  switch (method) {
    case "POST":
      try {
        await db.collection("users").insertOne({ _id: userId, ...req.body });
        return res.status(200).json({
          success: true,
          msg: "New User Created",
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
