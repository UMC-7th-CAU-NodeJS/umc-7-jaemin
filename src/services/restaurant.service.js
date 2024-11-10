import { createRestaurant } from '../repositories/restaurant.repository.js';
import { getAllStoreReviews, getAllStoreMissions } from '../repositories/user.repository.js';
import { responseFromReviews, responseFromMissions, responseFromRestaurant } from '../dtos/restaurant.dto.js';
import { getRestaurant } from '../repositories/restaurant.repository.js';

export const addRestaurant = async (data) => {
    const restaurantId = await createRestaurant({
      name: data.name,
      type: data.type,
      address: data.address,
      currentRegion: data.currentRegion
    });
    const restaurant = await getRestaurant(restaurantId);
    return responseFromRestaurant(restaurant)
  }

export const listStoreReviews = async (restaurantId, cursor = 0) => {
  const reviews = await getAllStoreReviews(restaurantId,cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (restaurantId, cursor = 0) => {
  const missions = await getAllStoreMissions(restaurantId,cursor);
  return responseFromMissions(missions);
};