const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

const getAllTransactions = async (req, res) => {
    const transactions = await Transaction.find().populate('sender receiver', 'name email');
    res.json(transactions);
};

module.exports = { getAllUsers, getAllTransactions };
