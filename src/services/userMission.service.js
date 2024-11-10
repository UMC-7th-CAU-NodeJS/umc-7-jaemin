import { checkMissionOngoing, addUserMission } from '../repositories/userMission.repository.js';
import { getUserMissionsByStatus, getUserMission, updateMissionStatus } from "../repositories/userMission.repository.js";
import { responseFromUserMissions } from '../dtos/userMission.dto.js';
import { MissionAlreadyOngoingError } from '../errors.js';

export const startMission = async (missionData) => {
  const { userId, missionId } = missionData;
  const check = await checkMissionOngoing(userId, missionId);

  const beginningMissionId = await addUserMission(missionData);
  const userMission = await getUserMission(userId, beginningMissionId);
  if (check) {
    throw new MissionAlreadyOngoingError("이미 도전 중인 미션입니다.", userMission);
  }
  
  return responseFromUserMissions(userMission);
};

export const completeMission = async (userId, missionId) => {
  return await updateMissionStatus(userId, missionId, "진행 완료");
};

export const listUserMissions = async (userId, status, cursor = 0) => {
  const userMissions = await getUserMissionsByStatus(userId, status, cursor);
  return responseFromUserMissions(userMissions);
};