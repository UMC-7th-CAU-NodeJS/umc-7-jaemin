export const bodyToRestaurant = (body) => {

    return {
      name: body.name,
      type: body.type,
      address: body.address,
      currentRegion: body.currentRegion
    }
  }

export const responseFromRestaurant = (restaurant) => {
  return {
    name: restaurant.name,
    type: restaurant.type,
    address: restaurant.address,
    currentRegion: restaurant.currentRegion
  };
};

