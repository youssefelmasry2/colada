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



