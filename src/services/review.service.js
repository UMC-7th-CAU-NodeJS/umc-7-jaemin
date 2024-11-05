import { createReview, checkRestaurantExists } from '../repositories/review.repository.js';


export const addReview = async (data) => {
  const exists = await checkRestaurantExists(data.restaurantId);
  if (!exists) {
    throw new Error("리뷰를 추가하려는 가게가 존재하지 않습니다.");
  }
  const reviewId = await createReview({
    restaurantId: data.restaurantId,
    userId: data.userId,
    rate: data.rate,
    content: data.content
  });
  
};

