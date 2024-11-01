import { StatusCodes } from 'http-status-codes';
import { startMission } from '../services/user_mission.service.js';
import { bodyToUserMission } from '../dtos/user_mission.dto.js'

export const handleStartMission = async (req, res) => {
  console.log("도전 중인 미션으로 추가를 요청했습니다!");
  console.log("body:", req.body);

  const userMission = await startMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: userMission });
};