export const bodyToReview = (body) => {
    return {
        restaurantId: body.restaurantId,
        userId: body.userId,
        rate: body.rate,
        content: body.content
      }
    }

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};