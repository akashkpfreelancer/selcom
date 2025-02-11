const express = require("express");
const { getUserTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserTransactions);

module.exports = router;
