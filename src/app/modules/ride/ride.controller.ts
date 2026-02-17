import { NextFunction, Request, Response } from "express";
import { RideService } from "./ride.service";

const requestRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RideService.requestRide(req.body);

    res.status(200).json({
      success: true,
      message: "Nearby drivers retrieved successfully",
      available_drivers: result,
    });
  } catch (error) {
    next(error);
  }
};

export const RideController = {
  requestRide,
};
