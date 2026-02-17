import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data first
  await prisma.car.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.user.deleteMany();

  // Create drivers
  await prisma.driver.createMany({
    data: [
      {
        name: "Driver A",
        is_available: true,
        current_lat: 23.8103,
        current_lng: 90.4125,
      },
      {
        name: "Driver B",
        is_available: true,
        current_lat: 23.815,
        current_lng: 90.42,
      },
      {
        name: "Driver C",
        is_available: true,
        current_lat: 23.8,
        current_lng: 90.4,
      },
      {
        name: "Driver D",
        is_available: true,
        current_lat: 23.79,
        current_lng: 90.39,
      },
      {
        name: "Driver E",
        is_available: true,
        current_lat: 23.83,
        current_lng: 90.43,
      },
      {
        name: "Driver F",
        is_available: false,
        current_lat: 23.81,
        current_lng: 90.41,
      },
      {
        name: "Driver G",
        is_available: true,
        current_lat: 23.805,
        current_lng: 90.405,
      },
      {
        name: "Driver H",
        is_available: true,
        current_lat: 23.82,
        current_lng: 90.425,
      },
    ],
  });

  // Fetch all drivers
  const drivers = await prisma.driver.findMany();

  // Create cars for each driver
  for (const driver of drivers) {
    await prisma.car.create({
      data: {
        driver_id: driver.id,
        model: "Toyota Axio",
        plate_number: `DHK-${driver.id}234`,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
