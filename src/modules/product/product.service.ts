import Product from "./product.model";
import { getMerchantById } from "../merchant/merchant.service";

export const createProduct = async (
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    merchantId: string
) => {
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    const newProduct = new Product({ name, description, price, stock, category, merchantId });
    return await newProduct.save();
}

export const getProductsByMerchant = async (merchantId: string) => {
    const merchant = await getMerchantById(merchantId);
    if (!merchant) {
        throw new Error('Merchant not found');
    }
    return await Product.find({ merchantId });
}

export const getAllProducts = async () => {
    return await Product.find();
}

export const getProductById = async (productId: string) => {
    return await Product.findById(productId);
}

export const getPriceSnapshot = async (productIds: string[]): Promise<number[]> => {
    const products = await Product.find({ _id: { $in: productIds } });
    return products.map(product => product.price);
}