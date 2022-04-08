import connectDB from "../../../util/mongodb";
import { Test } from "../../../models/Test";

const handler = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      const { name } = req.body;
      try {
        const newTest = new Test({ name });
        const createdTest = await newTest.save();
        return res.status(200).json({
          success: true,
          msg: "New Test Created",
          data: createdTest,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    case "GET":
      const savedTests = await Test.find(); //search savedTest by name;
      if (savedTests)
        return res.status(200).json({
          success: true,
          data: savedTests,
        });
      else return res.status(400).json({ success: false, msg: `There is no Test` });

    default:
      break;
  }
};
export default connectDB(handler);
