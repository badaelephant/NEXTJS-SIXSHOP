import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  const categoryId = `category-${new Date().valueOf()}`;
  switch (method) {
    case "POST":
      try {
        await db.collection("categories").insertOne({ _id: categoryId, ...req.body });
        return res.status(200).json({
          success: true,
          msg: "New Category Created",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    case "GET":
      const savedCategories = await db
        .collection("categories")
        .find({})
        .toArray()
        .catch((err) => {
          return res.status(500).json({
            success: false,
            msg: err,
          });
        });
      if (savedCategories)
        return res.status(200).json({
          success: true,
          data: savedCategories,
        });
      else return res.status(400).json({ success: false, msg: `There is no Category` });

    default:
      break;
  }
}
