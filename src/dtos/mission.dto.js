export const bodyToMission = (body) => {
    return {
        restaurantId: body.restaurantId,
        description: body.description,
        score: body.score
      }
    }


export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};