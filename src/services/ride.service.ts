import prisma from "../config/prisma";
import { calculateDistance } from "../utils/haversine";

export const findNearbyDrivers = async (
  pickupLat: number,
  pickupLng: number,
  radiusKm: number,
) => {
  const drivers = await prisma.driver.findMany({
    where: { is_available: true },
    include: { car: true },
  });

  const nearbyDrivers = drivers
    .map((driver) => {
      const distance = calculateDistance(
        pickupLat,
        pickupLng,
        driver.current_lat,
        driver.current_lng,
      );

      return {
        driver_id: driver.id,
        car_model: driver.car?.model,
        distance_km: distance,
        location: {
          lat: driver.current_lat,
          lng: driver.current_lng,
        },
      };
    })
    .filter((driver) => driver.distance_km <= radiusKm)
    .sort((a, b) => a.distance_km - b.distance_km);

  return nearbyDrivers;
};
