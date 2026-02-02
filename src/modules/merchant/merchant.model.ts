import mongoose from "mongoose";

export const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storeName: { type: String, required: true },
    logo_url: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;