import { createMission } from "../repositories/mission.repository.js";
import { getMission } from "../repositories/mission.repository.js";
import { responseFromMissions } from "../dtos/mission.dto.js";

export const addMission = async (data) => {
    const missionId = await createMission({
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score,
    });

    const mission = await getMission(missionId);
    return responseFromMissions(mission);
  }