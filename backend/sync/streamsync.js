
const { MongoClient } = require("mongodb");

const { Client } = require("@elastic/elasticsearch");


const mongoUri = "mongodb://localhost:27017";
const elasticUri = "http://localhost:9200";
const dbName = "food-ecommerce";
const collectionName = "foodproducts";

const mongoClient = new MongoClient(mongoUri);
const elasticClient = new Client({
  node: elasticUri,
  auth: {
    username: "elastic", 
    password: "elastic", 
  },
  ssl: {
    rejectUnauthorized: false, 
  },
});


async function pollChanges() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    let lastCheck = new Date();

    console.log("Polling for changes started...");
    setInterval(async () => {
        // console.log("itchecking")
      try {
        const currentCheck = new Date();

        
        const newDocuments = await collection
          .find({ createdAt: { $gt: lastCheck, $lte: currentCheck } })
          .toArray();

        if (newDocuments.length > 0) {
          console.log(`New documents found: ${newDocuments.length}`);
        }
        for (const doc of newDocuments) {
          try {
            await elasticClient.index({
              index: "foodproducts",
              id: doc._id.toString(),
              document: doc,
            });
            console.log(`Indexed new document: ${doc._id}`);
          } catch (err) {
            console.error(`Error indexing document ${doc._id}:`, err);
          }
        }


        const updatedDocuments = await collection
          .find({ updatedAt: { $gt: lastCheck, $lte: currentCheck } })
          .toArray();

        if (updatedDocuments.length > 0) {
          console.log(`Updated documents found: ${updatedDocuments.length}`);
        }
        for (const doc of updatedDocuments) {
          try {
            await elasticClient.update({
              index: "foodproducts",
              id: doc._id.toString(),
              doc: { doc },
            });
            console.log(`Updated document: ${doc._id}`);
          } catch (err) {
            console.error(`Error updating document ${doc._id}:`, err);
          }
        }

        
        const deletedDocuments = await collection
          .find({ deletedAt: { $gt: lastCheck, $lte: currentCheck } })
          .toArray();

        if (deletedDocuments.length > 0) {
          console.log(`Deleted documents found: ${deletedDocuments.length}`);
        }
        for (const doc of deletedDocuments) {
          try {
            await elasticClient.delete({
              index: "foodproducts",
              id: doc._id.toString(),
            });
            console.log(`Deleted document from Elasticsearch: ${doc._id}`);
          } catch (err) {
            console.error(`Error deleting document ${doc._id}:`, err);
          }
        }

        lastCheck = currentCheck;
      } catch (pollError) {
        console.error("Error during polling iteration:", pollError);
      }
    }, 2000); 
  } catch (error) {
    console.error("Error setting up polling:", error);
  }
}


module.exports = { pollChanges };

