import { Router, Response } from "express";
import { servicem8Service } from "../services/servicem8.service.js";
import { mockService } from "../services/mock.service.js";
import { isServiceM8Configured } from "../config/index.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { ApiResponse, Attachment } from "../types/index.js";

const router = Router();

router.get("/booking/:bookingId", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { bookingId } = req.params;

		const service = isServiceM8Configured() ? servicem8Service : mockService;
		const attachments = await service.getAttachmentsByJob(bookingId);

		res.json({
			success: true,
			data: attachments,
		} as ApiResponse<Attachment[]>);
	} catch (error) {
		console.error("Get attachments error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch attachments",
		} as ApiResponse<Attachment[]>);
	}
});

export default router;
