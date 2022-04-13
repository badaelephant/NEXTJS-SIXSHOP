import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  switch (method) {
    case "POST":
      try {
        const { email, role, password } = req.body;
        console.log({ email, role, password });
        const user = await db.collection("users").findOne({ email, role, password });

        if (user) {
          return res.status(200).json({
            success: true,
            data: user,
          });
        } else {
          return res.status(500).json({
            success: false,
            msg: "Login Failed",
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
