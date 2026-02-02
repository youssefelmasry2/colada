import express from 'express';
import { Request, Response } from 'express';
import { createReview, getReviewsByProduct, getReviewsByUser } from './review.service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { userId, productId, rating, comment } = req.body;
    try {
        const newReview = await createReview(userId, productId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating review', error });
    }
});

router.get('/product/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params as { productId: string };
    try {
        const reviews = await getReviewsByProduct(productId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews for product', error });
    }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    try {
        const reviews = await getReviewsByUser(userId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews for user', error });
    }
});

export default router;