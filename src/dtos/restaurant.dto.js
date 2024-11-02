export const bodyToRestaurant = (body) => {

    return {
      name: body.name,
      type: body.type,
      address: body.address,
      currentRegion: body.currentRegion
    }
  } 