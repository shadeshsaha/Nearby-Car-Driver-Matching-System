import { z } from "zod";

export const RideValidation = {
  requestRide: z.object({
    body: z.object({
      user_id: z.number(),
      pickup_lat: z.number(),
      pickup_lng: z.number(),
      radius_km: z.number().positive(),
    }),
  }),
};
