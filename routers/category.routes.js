const CategoryController = require("../controllers/category_controller");
const express = require("express");
const router = express.Router();

// CRUD Routes for Categories
router.post("/", CategoryController.createCategory);       // Create category
router.get("/", CategoryController.getCategories);         // Get all categories
router.get("/:id", CategoryController.getCategory);       // Get single category
router.put("/:id", CategoryController.updateCategory);    // Update category
router.delete("/:id", CategoryController.deleteCategory); // Delete category

module.exports = router;