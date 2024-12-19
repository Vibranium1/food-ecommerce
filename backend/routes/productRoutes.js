const express = require("express");
const FoodProduct = require("../models/foodproduct");
const authMiddleware = require("../routes/authMiddleware");

const router = express.Router();
const Category = require("../models/category");




router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategory");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




router.post("/create", async (req, res) => {
  console.log(req.body)
  const { title, desc, img, categoryName, parentCategory, sizes } = req.body;
  // console.log(desc,img, "from backend")

  if (!title || !desc || !img || !categoryName || !sizes.Half || !sizes.Full) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
   
    let category = await Category.findOne({ name: categoryName });


    if (!category) {
      category = new Category({ name: categoryName, parentCategory });
      await category.save();
    }
    
    console.log("Category ID:", category._id);
    

    const newFood = new FoodProduct({
      title:title,
      desc:desc,
      img:img,
      category: category._id,
      parentCategory,
      sizes:sizes,
    });
    

    await newFood.save();
    console.log(desc,img, "from backend 2")
    res.status(201).json({
      message: "Food product and category created successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error4", error: err.message });
  }
});



router.get("/foodproducts", async (req, res) => {
  try {
    const products = await FoodProduct.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const product = await FoodProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const product = await FoodProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

module.exports = router;

