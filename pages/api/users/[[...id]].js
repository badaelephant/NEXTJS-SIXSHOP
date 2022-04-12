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

        try {
          const { email, role, password } = req.body;
          console.log("login", { email, role, password });
          const user = await db.collection("users").findOne({ email, role, password });
          //TODO: later will be updated with jwt token base login
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
      //user role 변경 불가. name, password 변경 가능.
      //회원 탈퇴시 동작.
      //user role == client => customer status (deactivated로) 변경
      //user role == shop => shop status (closed로) 변경 ( 접근 불가)
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
        let shops;
        if (savedUser.role === "owner") shops = await db.collection("shops").find({ ownerId: id[0] }).toArray();
        else shops = await db.collection("shops").find({}).toArray();
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
