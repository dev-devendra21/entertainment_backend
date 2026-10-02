import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
	level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
	timestamp: pino.stdTimeFunctions.isoTime,
	redact: {
		paths: [
			"req.headers.authorization",
			"req.headers.cookie",
			"res.headers.set-cookie",
		],
		censor: "[REDACTED]",
	},
	...(!isProduction && {
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
				singleLine: true,
				translateTime: "SYS:standard",
				ignore: "pid,hostname",
			},
		},
	}),
});

export default logger;
