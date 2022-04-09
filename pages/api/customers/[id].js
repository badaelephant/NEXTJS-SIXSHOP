import clientPromise from "../../../middlewares/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;
  const client = await clientPromise;
  const db = client.db("sixshop");
  switch (method) {
    case "POST":
      try {
        const createdCustomer = await db.collection("customers").insertOne({ _id: customerId, ...req.body });
        return res.status(200).json({
          success: true,
          msg: "New Customer Created",
          data: createdCustomer,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }

    // case "GET":
    //   const savedCustomers = await Customer.find(); //search savedCustomer by name;
    //   if (savedCustomers)
    //     return res.status(200).json({
    //       success: true,
    //       data: savedCustomers,
    //     });
    //   else return res.status(400).json({ success: false, msg: `There is no Customer` });

    default:
      break;
  }
}
