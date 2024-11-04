import { prisma } from '../db.config.js';

export const checkRestaurantExists = async (restaurantId) => {
  const count = await prisma.restaurant.count({
    where: {
      id: restaurantId
    }
  });
  return count > 0;
};

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

export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, content: true, restaurantId: true, userId: true },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });

  return reviews;
};