import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
