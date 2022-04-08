import connectDB from "../../util/mongodb";
import { Category } from "../../models/Category";

const handler = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      const { name } = req.body;
      try {
        const newCategory = new Category({ name });
        const createdCategory = await newCategory.save();
        return res.status(200).json({
          success: true,
          msg: "New Category Created",
          data: createdCategory,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    case "GET":
      const savedCategories = await Category.find(); //search savedTest by name;
      if (savedCategories)
        return res.status(200).json({
          success: true,
          data: savedCategories,
        });
      else return res.status(400).json({ success: false, msg: `There is no Category` });

    default:
      break;
  }
};
export default connectDB(handler);
