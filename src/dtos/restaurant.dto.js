export const bodyToRestaurant = (body) => {

    return {
      name: body.name,
      type: body.type,
      address: body.address,
      currentRegion: body.currentRegion
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