const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 500 },
    currency: { type: String, default: 'INR' }
});

module.exports = mongoose.model('Wallet', WalletSchema);
