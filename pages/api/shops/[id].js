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
    case "DELETE":
      try {
        const deleted = await db.collection("shops").deleteOne({ _id: id });
        if (deleted) {
          await db.collection("customers").deleteMany({ store: id });
          await db.collection("products").deleteMany({ store: id });
          await db.collection("orders").deleteMany({ store: id });
          await db.collection("customs").deleteMany({ store: id });
          return res.status(200).json({
            success: true,
            msg: "Shop Info Deleted!!",
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }
    case "GET":
      try {
        const shop = await db.collection("shops").findOne({ _id: id });

        if (shop) {
          const customers = await db.collection("customers").find({ store: id });
          const products = await db.collection("products").find({ store: id });
          const orders = await db.collection("orders").find({ store: id });
          const customs = await db.collection("customs").find({ store: id });
          return res.status(200).json({
            success: true,
            msg: "Shop Info Searched!!",
            data: {
              shop,
              customers,
              products,
              orders,
              customs,
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
