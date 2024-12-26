import { StatusCodes } from 'http-status-codes';
import { startMission } from '../services/userMission.service.js';
import { bodyToUserMission } from '../dtos/userMission.dto.js'
import { completeMission, listUserMissions } from "../services/userMission.service.js";

export const handleStartMission = async (req, res) => {
/*
    #swagger.tags = ['미션 관련'];
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" },
              missionId: { type: "integer" }
              deadline: { type: "string", format: "date" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  userId: { type: "integer" },
                  missionId: { type: "integer" },
                  deadline: { type: "string", format: "date" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("도전 중인 미션으로 추가를 요청했습니다!");
  console.log("body:", req.body);

  const userMission = await startMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).success(userMission);
};

export const handleCompleteUserMission = async (req, res, next) => {
/*
    #swagger.tags = ['미션 관련'];
    #swagger.summary = '미션 완료 API';
    #swagger.responses[200] = {
      description: "미션 완료 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 완료 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M003" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const userId = parseInt(req.params.userId);
  const missionId = parseInt(req.params.missionId);
  const updatedMission = await completeMission(userId, missionId);
  res.status(StatusCodes.OK).success(updatedMission);
};

export const handleListUserMissions = async (req, res, next) => {
/*
  #swagger.tags = ['미션 관련'];
  #swagger.summary = '진행 중인 미션 목록 조회 API'
  #swagger.responses[200] = {
    description: "진행 중인 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      status: { type: "string" },
                      missionId: { type: "integer" },
                      userId: { type: "integer" },
                      deadline: { type: "string", format: "date" }
                    }
                  }
                },
                pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
              }
            }
          }
        }
      }
    }
  };
*/
  const userId = parseInt(req.params.userId);
  const status = req.query.status;
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const userMissions = await listUserMissions(userId, status, cursor);
  res.status(StatusCodes.OK).success(userMissions);
};