import { Router, Response } from "express";
import { servicem8Service } from "../services/servicem8.service.js";
import { mockService } from "../services/mock.service.js";
import { isServiceM8Configured } from "../config/index.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { ApiResponse, Job } from "../types/index.js";

const router = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const customerId = req.customerId!;

		const service = isServiceM8Configured() ? servicem8Service : mockService;
		const jobs = await service.getJobsByCustomer(customerId);

		res.json({
			success: true,
			data: jobs,
		} as ApiResponse<Job[]>);
	} catch (error) {
		console.error("Get bookings error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch bookings",
		} as ApiResponse<Job[]>);
	}
});

router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const service = isServiceM8Configured() ? servicem8Service : mockService;
		const job = await service.getJobById(id);

		if (!job) {
			res.status(404).json({
				success: false,
				error: "Booking not found",
			} as ApiResponse<Job>);
			return;
		}

		res.json({
			success: true,
			data: job,
		} as ApiResponse<Job>);
	} catch (error) {
		console.error("Get booking error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch booking details",
		} as ApiResponse<Job>);
	}
});

export default router;
