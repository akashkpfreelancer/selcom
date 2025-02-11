const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const getBalance = async (req, res) => {
    const wallet = await Wallet.findOne({ userId: req.user._id });
    res.json({ balance: wallet.balance, currency: wallet.currency });
};

const transferFunds = async (req, res) => {
    const { recipientEmail, amount } = req.body;
    console.log(`Transfer from ${req.user} to ${recipientEmail} of ${amount}`);
    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const senderWallet = await Wallet.findOne({ userId: req.user._id });
    if (senderWallet.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    const recipientWallet = await Wallet.findOne({ userId: recipient._id });
    console.log(senderWallet, recipientWallet);

    senderWallet.balance -= parseInt(amount);
    recipientWallet.balance += parseInt(amount);
    await senderWallet.save();
    await recipientWallet.save();

    await Transaction.create({ sender: req.user._id, receiver: recipient._id, amount });

    res.json({ message: 'Transfer successful' });
};

module.exports = { getBalance, transferFunds };
