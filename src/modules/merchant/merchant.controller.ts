import express , {Request , Response}from 'express';
import { getAllMerchants,  createMerchant } from './merchant.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const merchants = await getAllMerchants();
        res.status(200).json(merchants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching merchants', error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { name, email, password, storeName, logo_url } = req.body;
    try {
        const newMerchant = await createMerchant(name, email, password, storeName, logo_url);
        res.status(201).json(newMerchant);
    } catch (error) {
        res.status(500).json({ message: 'Error creating merchant', error });
    }
});

export default router;

