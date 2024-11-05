import { checkMissionOngoing, addUserMission } from '../repositories/userMission.repository.js';
import { getUserMissionsByStatus } from "../repositories/userMission.repository.js";
import { responseFromUserMissions } from '../dtos/userMission.dto.js';

export const startMission = async (missionData) => {
  const { userId, missionId } = missionData;
  const check = await checkMissionOngoing(userId, missionId);
  if (check) {
      throw new Error("이미 도전 중인 미션입니다.");
  }
  const beginningMissionId = await addUserMission(missionData);
  return { beginningMissionId };
};

export const listUserMissions = async (userId, status, cursor = 0) => {
  const userMissions = await getUserMissionsByStatus(userId, status, cursor);
  return responseFromUserMissions(userMissions);
};