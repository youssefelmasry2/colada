import express from "express";
import { Request, Response } from "express";
import { getMerchantOrdersBreakdown } from "./report.service";

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

export default router;