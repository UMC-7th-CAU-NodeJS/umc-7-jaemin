import { StatusCodes } from "http-status-codes";
import { addMission } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { listStoreMissions } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              restaurantId: { type: "integer" },
              description: { type: "string" },
              score: { type: "integer" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
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
                  id: { type: "integer" },
                  restaurantId: { type: "integer" },
                  description: { type: "string" },
                  score: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[401] = {
      description: "미션 추가 실패 응답(식당이 존재하지 않음)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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
    #swagger.responses[400] = {
      description: "미션 추가 실패 응답(이미 존재하는 미션)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M004" },
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
  console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트
    
    const mission = await addMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).success(mission)
  };

  export const handleListStoreMissions = async (req, res, next) => {
/*
  #swagger.summary = '식당별 미션 목록 조회 API'
  #swagger.responses[200] = {
    description: "식당별 미션 목록 조회 성공 응답",
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
                      id: { type: "number" },
                      description: { type: "string" },
                      restaurantId: { type: "number" },
                      score: { type: "number" }
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
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  };