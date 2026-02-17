import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

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
