import { createMission } from "../repositories/mission.repository.js";
import { getMission } from "../repositories/mission.repository.js";
import { responseFromMissions } from "../dtos/mission.dto.js";
import { checkRestaurantExists } from "../repositories/review.repository.js";
import { NoRestaurant } from "../errors.js";

export const addMission = async (data) => {
    const exists = await checkRestaurantExists(data.restaurantId);
    if (!exists) {
      throw new NoRestaurant("미션을 추가하려는 가게가 존재하지 않습니다.", data.restaurantId);
    }

    const missionId = await createMission({
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score,
    });

    const mission = await getMission(missionId);
    return responseFromMissions(mission);
  }