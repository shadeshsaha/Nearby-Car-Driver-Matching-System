import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { RideService } from "./ride.service";

const requestRide = asyncHandler(async (req: Request, res: Response) => {
  const result = await RideService.requestRide(req.body);

  res.status(200).json({
    success: true,
    message: "Nearby drivers retrieved successfully",
    available_drivers: result,
  });
});

export const RideController = {
  requestRide,
};
