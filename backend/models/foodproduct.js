const mongoose = require("mongoose");

const FoodProductSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  desc: { type: String  },
  img: { type: String }, 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
  },
  sizes: {
    Half: { type: Number },
    Full: { type: Number },
  },
});

module.exports = mongoose.model("FoodProduct", FoodProductSchema);
