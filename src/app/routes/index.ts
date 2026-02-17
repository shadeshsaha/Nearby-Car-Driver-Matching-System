import express from "express";
import rideRoutes from "../modules/ride/ride.route";

const router = express.Router();

router.use("/ride", rideRoutes);

export default router;
