import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");

  switch (method) {
    case "UPDATE":
      //shop: delete불가. shop status만 변경가능
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
      console.log("shop => get Data");
      console.log("get each infos", id);
      try {
        const shop = await db.collection("shops").findOne({ _id: id });

        if (shop) {
          const customers = await db.collection("customers").find({ store: id }).toArray();
          const products = await db.collection("products").find({ store: id }).toArray();
          const orders = await db.collection("orders").find({ store: id }).toArray();
          const customs = await db.collection("customs").find({ store: id }).toArray();
          console.log({ customers, products, orders, customs });
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
