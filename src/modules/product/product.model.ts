import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    logo_url: { type: String },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true , index: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;