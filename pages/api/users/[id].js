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
    case "GET":
      try {
        const user = await db.collection("users").findOne({ _id: id });

        if (user) {
          const shops =
            user.role == "owner"
              ? await db.collection("shops").find({ ownerId: id }).toArray()
              : await db.collection("shops").find().toArray();
          return res.status(200).json({
            success: true,
            data: {
              user,
              shops,
            },
          });
        } else {
          return res.status(500).json({
            success: false,
            msg: "There are No User with the id",
          });
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
