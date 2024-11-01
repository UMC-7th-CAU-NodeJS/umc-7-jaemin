export const bodyToMission = (body) => {
    return {
        restaurantId: body.restaurantId,
        description: body.description,
        score: body.score
      }
    }