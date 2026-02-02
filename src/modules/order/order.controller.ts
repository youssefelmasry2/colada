import express , {Request , Response}from 'express';
import { createOrder , getOrdersByUser , getAllOrders , getOrdersByMerchant , updateOrderStatus } from './order.service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { userId, merchantId, items , promotionCode } = req.body;
    try {
        const newOrder = await createOrder(userId, merchantId, items, promotionCode);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order', error });
    }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    try {
        const orders = await getOrdersByUser(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders for user', error });
    }
});

router.get('/merchant/:merchantId', async (req: Request, res: Response) => {
    const { merchantId } = req.params as { merchantId: string };
    try {
        const orders = await getOrdersByMerchant(merchantId);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders for merchant', error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching all orders', error });
    }
});

router.put('/:orderId/status', async (req: Request, res: Response) => {
    const { orderId } = req.params as { orderId: string };
    const { status } = req.body as { status: 'Pending' | 'Delivered' | 'Cancelled' };
    try {
        const updatedOrder = await updateOrderStatus(orderId, status);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status', error });
    }
});

export default router;