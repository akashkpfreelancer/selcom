const Transaction = require('../models/Transaction');

const getUserTransactions = async (req, res) => {
    const transactions = await Transaction.find({
        $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    }).populate('sender receiver', 'name email');

    res.json(transactions);
};

module.exports = { getUserTransactions };
