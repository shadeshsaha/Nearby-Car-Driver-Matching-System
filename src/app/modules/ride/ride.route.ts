import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RideController } from "./ride.controller";
import { RideValidation } from "./ride.validation";

const router = express.Router();

router.post(
  "/request",
  validateRequest(RideValidation.requestRide),
  RideController.requestRide,
);

export default router;
