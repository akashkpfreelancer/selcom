const express = require("express");
const { getAllUsers, getAllTransactions } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/transactions", authMiddleware, roleMiddleware("admin"), getAllTransactions);

module.exports = router;
