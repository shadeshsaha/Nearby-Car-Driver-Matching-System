import { Server } from "http";
import app from "./app";
import prisma from "./app/config/prisma";
import config from "./config";

async function nearbyCarAndDriverMatchingSystem() {
  const server: Server = app.listen(config.port, () => {
    console.info(`🚀 Server running on port ${config.port}`);
  });

  // Graceful Shutdown Handler
  const exitHandler = async () => {
    if (server) {
      server.close(() => {
        console.info("Server closed");
      });
    }
    await prisma.$disconnect();
    process.exit(1);
  };

  // Unexpected Error Handler
  const unexpectedErrorHandler = (error: unknown) => {
    console.error("Unexpected Error:", error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", async () => {
    console.info("SIGTERM received");
    await prisma.$disconnect();
    if (server) {
      server.close();
    }
  });
}

nearbyCarAndDriverMatchingSystem();
