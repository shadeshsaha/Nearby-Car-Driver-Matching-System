import { Request, Response } from "express";
import { findNearbyDrivers } from "../services/ride.service";

export const requestRide = async (req: Request, res: Response) => {
  try {
    const { user_id, pickup_lat, pickup_lng, radius_km } = req.body;

    if (!user_id || !pickup_lat || !pickup_lng || !radius_km) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const drivers = await findNearbyDrivers(
      Number(pickup_lat),
      Number(pickup_lng),
      Number(radius_km),
    );

    return res.status(200).json({
      success: true,
      available_drivers: drivers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
