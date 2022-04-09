import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const userId = `userId-${new Date().valueOf()}`;
  switch (method) {
    case "POST":
      if (id[0] === "register") {
        console.log("come to register");
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
      } else {
        //login
        console.log("come to login");
        try {
          const { email, role, password } = req.body;
          const user = await db.collection("users").findOne({ email, role, password });
          //later will be updated with jwt token base login
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
      }

    case "UPDATE":
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
      const savedUser = await db.collection("users").findOne({ _id: id[0] });

      if (savedUser) {
        const shops = await db.collection("shops").find({ ownerId: id[0] }).toArray();
        return res.status(200).json({
          success: true,
          msg: "User Info Searched!!",
          data: {
            user: savedUser,
            shops,
          },
        });
      } else return res.status(400).json({ success: false, msg: `There is no User` });

    default:
      break;
  }
}
