import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const shopId = `shop-${new Date().valueOf()}`;

  switch (method) {
    case "POST":
      try {
        const createdShop = await db.collection("shops").insertOne({ _id: shopId, ...req.body });
        return res.status(200).json({
          success: true,
          msg: "New Shop Created",
          data: createdShop,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    case "GET":
      try {
        const shops = await db.collection("shops").find({}).toArray();

        if (shops) {
          return res.status(200).json({
            success: true,
            msg: "Shop Info Searched!!",
            data: {
              shops,
            },
          });
        } else return res.status(400).json({ success: false, msg: `There is no Shop` });
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
