import Review from "./review.model";
import { getUserById } from "../users/users.service";
import { getProductById } from "../product/product.service";


export const createReview = async (
    userId: string,
    productId: string,
    rating: number,
    comment?: string
) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const product = await getProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    const newReview = new Review({ user: userId, product: productId, rating, comment });
    return await newReview.save();
}

export const getReviewsByProduct = async (productId: string) => {
    return await Review.find({ product: productId }).populate('user');
}

export const getReviewsByUser = async (userId: string) => {
    return await Review.find({ user: userId }).populate('product');
}

export const getAllReviews = async () => {
    return await Review.find().populate('user').populate('product');
}