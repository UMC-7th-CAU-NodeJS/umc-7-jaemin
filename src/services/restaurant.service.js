import { createRestaurant } from '../repositories/restaurant.repository.js';
import { getAllStoreReviews } from '../repositories/user.repository.js';
import { responseFromReviews } from '../dtos/restaurant.dto.js';

export const addRestaurant = async (data) => {
    const restaurantId = await createRestaurant({
      name: data.name,
      type: data.type,
      address: data.address,
      currentRegion: data.currentRegion
    });
  }

export const listStoreReviews = async (restaurantId, cursor = 0) => {
  const reviews = await getAllStoreReviews(restaurantId,cursor);
  return responseFromReviews(reviews);
};