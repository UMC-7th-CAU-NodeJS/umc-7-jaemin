import { prisma } from '../db.config.js';


export const createReview = async (data) => {
  const createdReview = await prisma.review.create({
    data: {
      restaurantId: data.restaurantId,
      userId: data.userId,
      rate: data.rate,
      content: data.content
    }
  });
  return createdReview.id; 
};

export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({
    where: { id: reviewId }
  });
  return review;
}