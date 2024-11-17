import { createMission } from "../repositories/mission.repository.js";
import { getMission, checkMissionExists } from "../repositories/mission.repository.js";
import { responseFromMissions } from "../dtos/mission.dto.js";
import { checkRestaurantExists } from "../repositories/restaurant.repository.js";
import { RestaurantNotExistError, MissionAlreadyExistError } from "../errors.js";
import { getAllStoreMissions } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
    const restaurantExists = await checkRestaurantExists(data.restaurantId);
    if (!restaurantExists) {
      throw new RestaurantNotExistError("미션을 추가하려는 가게가 존재하지 않습니다.", data.restaurantId);
    }
    const missionExists = await checkMissionExists(data);
    if (missionExists) {
      throw new MissionAlreadyExistError("이미 존재하는 미션입니다.", data);
    }

    const missionId = await createMission({
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score,
    });

    const mission = await getMission(missionId);
    return responseFromMissions(mission);
  }

  export const listStoreMissions = async (restaurantId, cursor = 0) => {
    const exists = await checkRestaurantExists(restaurantId);
    if (!exists) {
      throw new RestaurantNotExistError("미션을 조회하려는 가게가 존재하지 않습니다.", restaurantId);
    }
    const missions = await getAllStoreMissions(restaurantId,cursor);
    return responseFromMissions(missions);
  };