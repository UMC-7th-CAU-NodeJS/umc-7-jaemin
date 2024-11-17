import { createRestaurant } from '../repositories/restaurant.repository.js';
import { responseFromRestaurant } from '../dtos/restaurant.dto.js';
import { getRestaurant, checkRestaurantExists } from '../repositories/restaurant.repository.js';
import { ResataurantAlreadyExistError } from '../errors.js';

export const addRestaurant = async (data) => {
    const restaurantId = await createRestaurant({ // restaurantId가 아니라 restaurantData로 수정해야 할 듯
      name: data.name,
      type: data.type,
      address: data.address,
      currentRegion: data.currentRegion
    });
    const exists = await checkRestaurantExists(restaurantId);
    if (exists) {
      throw new ResataurantAlreadyExistError("식당이 이미 존재합니다.", restaurantId);
    }
    const restaurant = await getRestaurant(restaurantId);
    return responseFromRestaurant(restaurant)
  }



