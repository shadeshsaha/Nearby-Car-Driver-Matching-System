import { Server } from "http";
import app from "./app";
import prisma from "./app/config/prisma";
import config from "./config";

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

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

// import cors from "cors";
// import express from "express";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import routes from "./app/routes";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", routes);

// app.use(globalErrorHandler);

// export default app;

// // import bodyParser from "body-parser";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import express from "express";
// // import rideRoutes from "./routes/ride.routes";

// // dotenv.config();

// // const app = express();
// // const PORT = 3000;

// // app.use(cors());
// // app.use(bodyParser.json());
// // // app.use(express.json());

// // app.use("/api/ride", rideRoutes);

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
