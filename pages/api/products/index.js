import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const productId = `product-${new Date().valueOf()}`;

  switch (method) {
    case "POST":
      console.log("createProduct", req.body);
      try {
        const productResult = await db.collection("products").findOne({ name: req.body.name });
        if (productResult)
          return res.status(200).json({
            success: false,
            msg: "There are product with same name",
          });
        else {
          const createdProduct = await db.collection("products").insertOne({ _id: productId, ...req.body });
          return res.status(200).json({
            success: true,
            msg: "New Product Created",
            data: createdProduct,
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }
    case "PATCH":
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
      try {
        const shop = await db.collection("shops").findOne({ _id: id[0] });

        if (shop) {
          const customers = await db.collection("customers").find({ store: id[0] }).toArray();
          const products = await db.collection("products").find({ store: id[0] }).toArray();
          const orders = await db.collection("orders").find({ store: id[0] }).toArray();
          const customs = await db.collection("customs").find({ store: id[0] }).toArray();
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
