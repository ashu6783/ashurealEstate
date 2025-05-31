import express, { Request, Response } from "express";
import { createPaymentIntent } from "../controllers/payment.controller";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);

console.log("Payment routes registered");

export default router;