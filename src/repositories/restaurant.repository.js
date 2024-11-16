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

export const getRestaurant = async (restaurantId) => {
  const restaurant = await prisma.restaurant.findFirstOrThrow({
    where: { id: restaurantId }
  });
  return restaurant;
}

export const checkRestaurantExists = async (data) => {
  const count = await prisma.restaurant.count({
    where: {
      name: data.name,
      type: data.type,
      address: data.address,
      currentRegionId: data.currentRegion
    }
  });
  return count > 0;
}