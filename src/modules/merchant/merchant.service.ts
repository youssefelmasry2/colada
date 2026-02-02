import Merchant from "./merchant.model";


export const createMerchant = async (name: string, email: string, password: string, storeName: string, logo_url?: string) => {
    const newMerchant = new Merchant({ name, email, password, storeName, logo_url });
    return await newMerchant.save();
}

export const getMerchantByEmail = async (email: string) => {
    return await Merchant.findOne({ email });
}

export const getMerchantById = async (merchantId: string) => {
    return await Merchant.findById(merchantId);
}

export const getAllMerchants = async () => {
    return await Merchant.find();
}