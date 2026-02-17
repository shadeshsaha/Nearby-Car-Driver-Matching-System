import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔥 Global Error:", error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: { path: string; message: string }[] = [];

  // Prisma Known Errors (like P2002 unique error)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = "Database Error";

    if (error.code === "P2002") {
      message = `Duplicate field value: ${error.meta?.target}`;
    }

    errorMessages = [
      {
        path: "",
        message,
      },
    ];
  }

  // Prisma Validation Error
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  // Zod Error
  else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";

    errorMessages = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Normal Error
  else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
