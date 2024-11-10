import { createReview, checkRestaurantExists } from '../repositories/review.repository.js';
import { getReview } from '../repositories/review.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js';
import { NoRestaurant } from '../errors.js';

export const addReview = async (data) => {
  const exists = await checkRestaurantExists(data.restaurantId);
  if (!exists) {
    throw new NoRestaurant("리뷰를 추가하려는 가게가 존재하지 않습니다.", data.restaurantId);
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

