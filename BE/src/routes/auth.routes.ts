import { Router, Request, Response } from "express";
import { servicem8Service } from "../services/servicem8.service.js";
import { mockService } from "../services/mock.service.js";
import { isServiceM8Configured } from "../config/index.js";
import { createSession } from "../middleware/auth.middleware.js";
import { LoginRequest, AuthResponse } from "../types/index.js";

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, phone } = req.body as LoginRequest;

		if (!email || !phone) {
			res.status(400).json({
				success: false,
				message: "Email and phone number are required",
			} as AuthResponse);
			return;
		}

		const service = isServiceM8Configured() ? servicem8Service : mockService;
		const customer = await service.getCustomerByEmailAndPhone(email, phone);

		if (!customer) {
			res.status(401).json({
				success: false,
				message: "Invalid credentials",
			} as AuthResponse);
			return;
		}

		const token = createSession(customer.uuid, customer.email);

		res.json({
			success: true,
			customer,
			token,
			message: "Login successful",
		} as AuthResponse);
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		} as AuthResponse);
	}
});

export default router;
