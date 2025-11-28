import { Router, Request, Response } from "express";
import { messageService } from "../services/message.service.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware.js";
import { ApiResponse, Message } from "../types/index.js";

const router = Router();

router.get("/booking/:bookingId", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { bookingId } = req.params;
		const messages = messageService.getMessagesByBooking(bookingId);

		res.json({
			success: true,
			data: messages,
		} as ApiResponse<Message[]>);
	} catch (error) {
		console.error("Get messages error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch messages",
		} as ApiResponse<Message[]>);
	}
});

router.post("/booking/:bookingId", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const { bookingId } = req.params;
		const { message } = req.body;
		const customerId = req.customerId!;

		if (!message || typeof message !== "string" || message.trim().length === 0) {
			res.status(400).json({
				success: false,
				error: "Message is required",
			} as ApiResponse<Message>);
			return;
		}

		const newMessage = messageService.addMessage(bookingId, customerId, message.trim());

		res.status(201).json({
			success: true,
			data: newMessage,
			message: "Message sent successfully",
		} as ApiResponse<Message>);
	} catch (error) {
		console.error("Send message error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to send message",
		} as ApiResponse<Message>);
	}
});

export default router;
