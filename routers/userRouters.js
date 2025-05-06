const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, userController.getProfile);
router.put("/", authMiddleware, userController.updateUser);
router.delete("/", authMiddleware, userController.deleteUser);
module.exports = router;
