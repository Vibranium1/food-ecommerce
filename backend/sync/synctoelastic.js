const { MongoClient } = require("mongodb");
const { Client } = require("@elastic/elasticsearch");

const mongoUri = "mongodb://localhost:27017";
const elasticUri = "http://localhost:9200";
const dbName = "food-ecommerce";
const collectionName = "foodproducts";

const mongoClient = new MongoClient(mongoUri);

const elasticClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",    password: "elastic",   },
  ssl: {
    rejectUnauthorized: false, 
  },
});


async function syncData() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    const foodProducts = await collection.find({}).toArray();


    
    for (const product of foodProducts) {

      const { _id, ...document } = product; 
      await elasticClient.index({
        index: "foodproducts",
        id: _id.toString(), 
        document: document,
      });
    }
    console.log("Data synchronized successfully!");
  } catch (error) {
    console.error("Error syncing data:", error);
  } finally {
    await mongoClient.close();
  }
}

module.exports = { syncData };
