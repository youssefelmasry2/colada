import mongoose from "mongoose";
import Order from "../order/order.model";


export const getMerchantOrdersBreakdown = async (merchantId: string) => {
    const result = await Order.aggregate([
        {
            // match hya hya el (where)
            $match: {
                merchant: new mongoose.Types.ObjectId(merchantId)
            }
        },
        {
            // group hya hya el (group by)
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalRevenue: { $sum: '$totalAmount' },
                averageOrderValue: { $avg: '$totalAmount' }
            }
        },
    ]);
    return result;
};

export const getTopProducts = async (merchantId : string) => {
    const result = await Order.aggregate([
        {
            $match: {
                merchant: new mongoose.Types.ObjectId(merchantId),
                status: 'Delivered'
            }
        },
        {
            $unwind: '$items'
        },
        {
            $group: {
                _id: '$items.product',
                totalSold: { $sum: '$items.quantity' },
                totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
            }
        },
    ]);
    return result;
} 


