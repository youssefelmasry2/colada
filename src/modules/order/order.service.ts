import Order from "./order.model";
import { getPriceSnapshot } from "../product/product.service";
import { getUserById } from "../users/users.service";
import { getMerchantById } from "../merchant/merchant.service";
import { getPromotionByCode , validateAndIncrementCode } from "../promotion/promotion.service";

export const createOrder = async (
    userId: string,
    merchantId: string,
    items: { product: string; quantity: number; }[],
    promotionCode?: string
) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    let promotion = null;
    if (promotionCode) {
         promotion = await validateAndIncrementCode(promotionCode, merchantId);
        if (!promotion) {
            throw new Error('Promotion not found');
        }
    }

    const productIds = items.map(item => item.product);
    const prices = await getPriceSnapshot(productIds);
    const itemsWithPrices = items.map((item, index) => ({
        ...item,
        price: prices[index]
    }));
    const subtotal = calculateSubtotal(prices , items);
    const discountedAmount = promotion ? calculateDiscountedAmount(subtotal, promotion.discountPercentage / 100) : 0;
    const totalAmount = subtotal - discountedAmount;
    const newOrder = new Order({ user: userId, 
        merchant: merchantId,
         items: itemsWithPrices, 
         totalAmount, 
         discountedAmount, 
         promotion: promotion ? promotion._id : null, 
         subtotalAmount: subtotal });
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

const calculateDiscountedAmount = (subtotal: number, discountRate: number): number => {
    return subtotal * discountRate;
}

const calculateSubtotal = (prices: number[], items: { product: string; quantity: number }[]): number => {
    return items.reduce((sum, item, index) => sum + prices[index] * item.quantity, 0);
}
