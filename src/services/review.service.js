import { createReview, getReview } from '../repositories/review.repository.js';
import { checkRestaurantExists } from '../repositories/restaurant.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js';
import { RestaurantNotExistError } from '../errors.js';
import { getAllStoreReviews } from '../repositories/review.repository.js';

export const addReview = async (data) => {
  const exists = await checkRestaurantExists(data.restaurantId);
  if (!exists) {
    throw new RestaurantNotExistError("리뷰를 추가하려는 가게가 존재하지 않습니다.", data.restaurantId);
  }
  const reviewId = await createReview({
    restaurantId: data.restaurantId,
    userId: data.userId,
    rate: data.rate,
    content: data.content
  });

  const review = await getReview(reviewId);
  return responseFromReviews(review);
};

export const listStoreReviews = async (restaurantId, cursor = 0) => {
  const exists = await checkRestaurantExists(restaurantId);
  if (!exists) {
    throw new RestaurantNotExistError("리뷰를 조회하려는 가게가 존재하지 않습니다.", restaurantId);
  }
  const reviews = await getAllStoreReviews(restaurantId,cursor);
  return responseFromReviews(reviews);
};