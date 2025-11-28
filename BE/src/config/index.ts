import dotenv from "dotenv";

dotenv.config();

export const config = {
	port: Number(process.env.PORT) || 3001,
	servicem8: {
		apiKey: process.env.SERVICEM8_API_KEY || "",
		apiSecret: process.env.SERVICEM8_API_SECRET || "",
		baseUrl: process.env.SERVICEM8_BASE_URL || "https://api.servicem8.com",
	},
	env: process.env.NODE_ENV || "development",
};

export const isServiceM8Configured = (): boolean => {
	return !!(config.servicem8.apiKey && config.servicem8.apiSecret);
};
