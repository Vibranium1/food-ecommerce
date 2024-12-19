const express = require("express");
const { Client } = require("@elastic/elasticsearch");

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" ,   auth: {
  username: "elastic", 
  password: "elastic", 
},
ssl: {
  rejectUnauthorized: false, 
}});


router.post("/search", async (req, res) => {
  const { searchTerm, filters, limit = 10 } = req.body;




  const query = {
    bool: {
      should: [
        {
          regexp: {
            title: `.*${searchTerm}.*`,
          },
        },
        {
          regexp: {
            desc: `.*${searchTerm}.*`,
          },
        },
      ],
    },
  };
  
  

  // 

  try {
    const response = await client.search({
      index: "foodproducts",

      body: {
        query,

      },
    });


    res.json({
      products: response.hits.hits.map((hit) => hit._source),
      total: response.hits.total.value,
      facets: response.aggregations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Search failed.");
  }
});

module.exports = router;
