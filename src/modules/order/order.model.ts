import mongoose from "mongoose";
import { orderItemSchema } from "./order-item.model";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
    promotion : { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' ,default: null },
    items: { type: [orderItemSchema], required: true }, 
    totalAmount: { type: Number, required: true },
    subtotalAmount: { type: Number, required: true },
    discountedAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;