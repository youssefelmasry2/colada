import Order from "./order.model";
import { getPriceSnapshot } from "../product/product.service";
import { getUserById } from "../users/users.service";
import { getMerchantById } from "../merchant/merchant.service";

export const createOrder = async (
    userId: string,
    merchantId: string,
    items: { product: string; quantity: number; }[],
) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    const productIds = items.map(item => item.product);
    const prices = await getPriceSnapshot(productIds);
    items.forEach((item, index) => {
        (item as any).price = prices[index];
    });
    const totalAmount = items.reduce((total, item, index) => total + prices[index] * item.quantity, 0);
    const newOrder = new Order({ user: userId, merchant: merchantId, items, totalAmount });
    return await newOrder.save();
}

export const getOrdersByUser = async (userId: string) => {
    return await Order.find({ user: userId }).populate('items.product');
}

export const getOrdersByMerchant = async (merchantId: string) => {
    return await Order.find({ merchant: merchantId }).populate('items.product');
}

export const getAllOrders = async () => {
    return await Order.find().populate('items.product');
}

export const updateOrderStatus = async (orderId: string, status: 'Pending' | 'Delivered' | 'Cancelled') => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
}


