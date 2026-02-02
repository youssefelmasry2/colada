import Promotion from "./promotion.model";
import { getMerchantById } from "../merchant/merchant.service";


export const createPromotion = async (
    merchantId: string,
    code: string,
    discountPercentage: number,
    validFrom: Date,
    validTo: Date
) => {
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    const newPromotion = new Promotion({ merchant: merchantId, code, discountPercentage, validFrom, validTo });
    return await newPromotion.save();
}

export const getPromotionsByMerchant = async (merchantId: string) => {
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    return await Promotion.find({ merchant: merchantId });
}

export const getAllPromotions = async () => {
    return await Promotion.find().populate('merchant');
}

export const deactivatePromotion = async (promotionId: string) => {
    return await Promotion.findByIdAndUpdate(promotionId, { isActive: false }, { new: true });
}

export const incrementPromotionUsage = async (promotionId: string) => {
    return await Promotion.findByIdAndUpdate(promotionId, { $inc: { usedCount: 1 } }, { new: true });
}

export const getPromotionByCode = async (code: string) => {
    return await Promotion.findOne({ code });
}

export const validateAndIncrementCode = async (code: string, merchantId: string) => {
    const promotion = await Promotion.findOne({ code, merchant: merchantId, isActive: true });
    if (!promotion) {
        throw new Error('Invalid or inactive promotion code');
    }
    const now = new Date();
    if (now < promotion.validFrom || now > promotion.validTo) {
        throw new Error('Promotion code is not valid ');
    }
    await incrementPromotionUsage(promotion._id.toString());

    return promotion;
}

export const getPromotionById = async (promotionId: string) => {
    return await Promotion.findById(promotionId);
}

