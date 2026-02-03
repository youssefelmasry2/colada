import express from "express";
import { Request, Response } from "express";
import { getMerchantOrdersBreakdown , getTopProducts,  } from "./report.service";

const router = express.Router();

router.get("/merchant/:merchantId/orders-breakdown", async (req: Request, res: Response) => {
    const { merchantId } = req.params as { merchantId: string };
    try {
        const breakdown = await getMerchantOrdersBreakdown(merchantId);
        res.status(200).json(breakdown);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders breakdown for merchant", error });
    }
});

router.get("/merchant/:merchantId/top-products", async (req: Request, res: Response) => {
    const { merchantId } = req.params as { merchantId: string };
    try {
        const topProducts = await getTopProducts(merchantId);
        res.status(200).json(topProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching top products for merchant", error });
    }
});

export default router;