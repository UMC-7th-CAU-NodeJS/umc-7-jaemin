import { checkMissionOngoing, addUserMission } from '../repositories/userMission.repository.js';
import { updateMissionStatus } from "../repositories/userMission.repository.js";

export const startMission = async (missionData) => {
  const { userId, missionId } = missionData;
  const check = await checkMissionOngoing(userId, missionId);
  if (check) {
      throw new Error("이미 도전 중인 미션입니다.");
  }
  const beginningMissionId = await addUserMission(missionData);
  return { beginningMissionId };
};

export const completeMission = async (userId, missionId) => {
  return await updateMissionStatus(userId, missionId, "진행 완료");
};