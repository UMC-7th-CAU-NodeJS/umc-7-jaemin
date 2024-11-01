import { createMission } from "../repositories/mission.repository.js";


export const addMission = async (data) => {
    const missionId = await createMission({
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score,
    });
  }