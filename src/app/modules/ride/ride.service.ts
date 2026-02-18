import prisma from "../../config/prisma";

interface IRequestRidePayload {
  user_id: number;
  pickup_lat: number;
  pickup_lng: number;
  radius_km: number;
}

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth radius in KM
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // return full precision
};

const requestRide = async (payload: IRequestRidePayload) => {
  const { pickup_lat, pickup_lng, radius_km } = payload;

  const drivers = await prisma.driver.findMany({
    where: { is_available: true },
    include: { car: true },
  });

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
        location: {
          lat: driver.current_lat,
          lng: driver.current_lng,
        },
      };
    })
    .filter((d) => d.distance_km <= radius_km)
    .sort((a, b) => a.distance_km - b.distance_km);

  return nearbyDrivers;
};

export const RideService = {
  requestRide,
};
