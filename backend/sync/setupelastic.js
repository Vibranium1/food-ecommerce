const { Client } = require("@elastic/elasticsearch");


const elasticClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic", 
    password: "elastic", 
  },
  ssl: {
    rejectUnauthorized: false, 
  },
});


async function setupIndex() {
  try {
    await elasticClient.indices.create({
      index: "foodproducts",
      body: {
        settings: {
          "index.max_ngram_diff": 9,
          analysis: {
            analyzer: {
              ngram_analyzer: {
                tokenizer: "ngram_tokenizer",
              },
            },
            tokenizer: {
              ngram_tokenizer: {
                type: "ngram",
                min_gram: 1,
                max_gram: 10,
                token_chars: ["letter", "digit"],
              },
            },
          },
        },

        mappings: {
          properties: {
            title: {
              "type": "text",
              "analyzer": "ngram_analyzer"
            },
            desc: {
              "type": "text",
              "analyzer": "ngram_analyzer"
            },
            img: { type: "text" },
            category: { type: "keyword" },
            parentcategory: { type: "keyword" },
            size: { 
              type: "object", 
              properties: {
                Half: { type: "integer" },
                Full: { type: "integer" }
              }
            }
          }
        }
      }
    });
    console.log("Index created successfully!");
  } catch (error) {
       if (error.meta?.body?.error?.type === "resource_already_exists_exception") {
      console.log("Index already exists.");
    } else {
      console.error("Error creating index:", error);
    }
  }
}

setupIndex();

module.exports = { setupIndex };
