import { StatusCodes } from "http-status-codes";
import { addMission } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleAddMission = async (req, res, next) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트
    
    const mission = await addMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).success(mission)
  };

