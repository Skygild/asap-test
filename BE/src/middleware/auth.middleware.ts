import { Request, Response, NextFunction } from "express";

const sessions = new Map<string, { customerId: string; email: string }>();

export interface AuthRequest extends Request {
	customerId?: string;
	customerEmail?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		res.status(401).json({ success: false, error: "No token provided" });
		return;
	}

	const session = sessions.get(token);

	if (!session) {
		res.status(401).json({ success: false, error: "Invalid or expired token" });
		return;
	}

	req.customerId = session.customerId;
	req.customerEmail = session.email;
	next();
};

export const createSession = (customerId: string, email: string): string => {
	const token = Buffer.from(`${customerId}:${email}:${Date.now()}`).toString("base64");
	sessions.set(token, { customerId, email });
	return token;
};

export const clearSession = (token: string): void => {
	sessions.delete(token);
};
