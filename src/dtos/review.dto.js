export const bodyToReview = (body) => {
    return {
        restaurantId: body.restaurantId,
        userId: body.userId,
        rate: body.rate,
        content: body.content
      }
    }