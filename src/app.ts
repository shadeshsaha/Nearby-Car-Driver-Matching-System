import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

import routes from "./app/routes";

const app: Application = express();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

// Cookie Parser
app.use(cookieParser());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// Root Route
app.get("/", async (req: Request, res: Response) => {
  res.send("Nearby Car & Driver Matching System Server Running...");
});

// Global Error Handler (must be before 404 handler)
app.use(globalErrorHandler);

// Handle Not Found Routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

export default app;
