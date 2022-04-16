// mongodb.js

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;
console.log("process.env.NODE_ENV!!", process.env.NODE_ENV);
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;
console.log("mongodb", clientPromise);
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;
