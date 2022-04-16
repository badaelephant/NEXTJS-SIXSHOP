const clientPromise = require("../../../middlewares/database");

module.exports = async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sixshop");
  const orderId = `order-${new Date().valueOf()}`;

  const { customer, store, price, products } = req.body;
  console.log({ customer, store, price, products });
  if (price <= 0) {
    return res.status(400).json({
      success: false,
      msg: "Order Price has to bee more than 0 won",
    });
  }
  if (products.length == 0) {
    return res.status(400).json({
      success: false,
      msg: "Products has to bee more than one item",
    });
  }
  try {
    const user = await db.collection("users").findOne({ _id: customer });
    console.log("user", user);
    if (user) {
      await db.collection("orders").insertOne({ _id: orderId, ...req.body });

      const savedCustomer = await db.collection("customers").findOne({ _id: customer });
      console.log("customer", savedCustomer);
      if (savedCustomer) {
        console.log("customer");
        await db
          .collection("customers")
          .update(
            { _id: user._id, store },
            { _id: user._id, store, name: user.name, email: user.email, password: user.password },
            { upsert: true }
          );
      } else {
        console.log("no customer");
        console.log("customer", { ...user, store });
        await db.collection("customers").insertOne({ ...user, store });
      }

      return res.status(200).json({
        success: true,
        msg: "New Order Created",
        id: orderId,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "customer input is incorrect, it is not in user collection",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
