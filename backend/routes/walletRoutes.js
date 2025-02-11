const express = require("express");
const { getBalance, transferFunds } = require("../controllers/walletController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;
