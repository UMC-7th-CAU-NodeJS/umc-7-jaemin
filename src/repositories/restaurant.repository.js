import { prisma } from '../db.config.js';

export const createRestaurant = async (data) => {
  const createdRestaurant = await prisma.restaurant.create({
    data: {
      name: data.name,
      type: data.type,
      address: data.address,
      currentRegionId: data.currentRegion // Ensure that this maps correctly to a foreign key if applicable
    }
  });
  return createdRestaurant.id;
};
  