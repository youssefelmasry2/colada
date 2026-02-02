import express , {Request , Response}from 'express';
import { getAllProducts,  createProduct , getProductsByMerchant} from './product.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

router.get('/merchant/:merchantId', async (req: Request, res: Response) => {
    const { merchantId } = req.params as { merchantId: string };
    try {
        const products = await getProductsByMerchant(merchantId); 
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products for merchant', error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { name, description, price, stock, category, merchantId } = req.body;
    try {
        const newProduct = await createProduct(name, description, price, stock, category, merchantId);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error });
    }
});

export default router;

