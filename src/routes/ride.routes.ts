// import { Router } from "express";
// import { requestRide } from "../controllers/ride.controller";

// const router = Router();

// router.post("/request", requestRide);

// export default router;

import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

/**
 * Haversine formula to calculate distance between two coordinates in km
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

router.post("/request", async (req, res) => {
  try {
    const { user_id, pickup_lat, pickup_lng, radius_km } = req.body;

    if (
      user_id === undefined ||
      pickup_lat === undefined ||
      pickup_lng === undefined ||
      radius_km === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request body" });
    }

    // Fetch all available drivers
    const drivers = await prisma.driver.findMany({
      where: { is_available: true },
      include: { car: true },
    });

    // Compute distance and filter by radius
    const nearbyDrivers = drivers
      .map((driver) => {
        const distance = haversineDistance(
          pickup_lat,
          pickup_lng,
          driver.current_lat,
          driver.current_lng,
        );
        return {
          driver_id: driver.id,
          car_model: driver.car?.model ?? null,
          distance_km: Number(distance.toFixed(2)),
          location: { lat: driver.current_lat, lng: driver.current_lng },
        };
      })
      .filter((driver) => driver.distance_km <= radius_km)
      .sort((a, b) => a.distance_km - b.distance_km);

    res.json({ success: true, available_drivers: nearbyDrivers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
