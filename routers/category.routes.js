const CategoryController = require("../controllers/category_controller");
const express = require("express");
const router = express.Router();

router.post("/", CategoryController.createCategory);   
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;