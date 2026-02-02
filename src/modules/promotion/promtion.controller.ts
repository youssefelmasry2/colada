import express , {Request , Response}from 'express';
import { createPromotion, getPromotionsByMerchant, getAllPromotions } from './promotion.service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const {  merchantId,
    code,
    discountPercentage,
    validFrom,
    validTo } = req.body;
    try {
        const newPromotion = await createPromotion(merchantId, code, discountPercentage, validFrom, validTo);
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating promotion', error });
    }
});

router.get('/merchant/:merchantId', async (req: Request, res: Response) => {
    const { merchantId } = req.params as { merchantId: string };
    try {
        const promotions = await getPromotionsByMerchant(merchantId);
        res.status(200).json(promotions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching promotions for merchant', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const promotions = await getAllPromotions();
        res.status(200).json(promotions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching all promotions', error });
    }
});

export default router;