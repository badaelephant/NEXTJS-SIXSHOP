import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const productId = `product-${new Date().valueOf()}`;

  switch (method) {
    case "POST":
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

    default:
      break;
  }
}
