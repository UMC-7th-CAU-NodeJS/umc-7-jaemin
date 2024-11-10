import { StatusCodes } from 'http-status-codes';
import { startMission } from '../services/userMission.service.js';
import { bodyToUserMission } from '../dtos/userMission.dto.js'
import { completeMission, listUserMissions } from "../services/userMission.service.js";

export const handleStartMission = async (req, res) => {
  console.log("도전 중인 미션으로 추가를 요청했습니다!");
  console.log("body:", req.body);

  const userMission = await startMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success(userMission);
};

export const handleCompleteUserMission = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const missionId = parseInt(req.params.missionId);
  const updatedMission = await completeMission(userId, missionId);
  res.status(StatusCodes.OK).json({ data: updatedMission });
};

export const handleListUserMissions = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const status = req.query.status;
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const userMissions = await listUserMissions(userId, status, cursor);
  res.status(200).json({ data: userMissions });
};