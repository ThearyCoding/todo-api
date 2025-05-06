const Category = require("../models/Category");
const Todo = require("../models/Todo");

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

exports.createCategory = async (req, res) => {
  try {
    const { title, color } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!color) {
      return res.status(400).json({ error: "Color is required" });
    }

    if (!hexColorRegex.test(color)) {
      return res.status(400).json({ error: "Invalid HEX color format" });
    }

    const existingCategory = await Category.findOne({
      title: title
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const newCategory = new Category({ title, color });
    await newCategory.save();

    res.status(201).json({message: "Category Created Successfully."});
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        const todos = await Todo.find({ categoryId: category._id });
        const totalTodos = todos.length;
        const completedTodos = todos.filter(todo => todo.completed).length;
        const progress = totalTodos > 0
          ? Math.round((completedTodos / totalTodos) * 100)
          : 0;

        return {
          _id: category._id,
          title: category.title,
          color: category.color,
          totalTodos,
          completedTodos,
          progress,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        };
      })
    );

    res.status(200).json(categoriesWithStats);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const todos = await Todo.find({ categoryId: category._id });
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const progress = totalTodos > 0
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

    const categoryWithStats = {
      ...category.toObject(),
      totalTodos,
      completedTodos,
      progress
    };

    res.status(200).json(categoryWithStats);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { title, color } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (color) {
      if (!hexColorRegex.test(color)) {
        return res.status(400).json({ error: "Invalid HEX color format" });
      }
      updateData.color = color;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
