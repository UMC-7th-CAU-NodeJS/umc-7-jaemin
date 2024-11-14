import { checkMissionOngoing, addUserMission } from '../repositories/userMission.repository.js';
import { getUserMissionsByStatus, getUserMission, updateMissionStatusToComplete } from "../repositories/userMission.repository.js";
import { responseFromUserMissions } from '../dtos/userMission.dto.js';
import { MissionAlreadyOngoingError } from '../errors.js';

export const startMission = async (missionData) => {
  const { userId, missionId } = missionData;
  const check = await checkMissionOngoing(userId, missionId);

  const userMission = await addUserMission(missionData);
  if (check) {
    throw new MissionAlreadyOngoingError(userMission);
  }
  
  return responseFromUserMissions([userMission]);
};

export const completeMission = async (userId, missionId) => {
  await updateMissionStatusToComplete(userId, missionId);
  return responseFromUserMissions(await getUserMission(userId, missionId));
};

export const listUserMissions = async (userId, status, cursor = 0) => {
  const userMissions = await getUserMissionsByStatus(userId, status, cursor);
  return responseFromUserMissions(userMissions);
};