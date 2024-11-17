import { StatusCodes } from "http-status-codes";
import { addRestaurant } from "../services/restaurant.service.js";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";

export const handleAddRestaurant = async (req, res, next) => {
  /*
    #swagger.summary = '식당 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string" },
              address: { type: "string" },
              currentRegion: { type: "integer" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "식당 추가 성공 응답",
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
                  id: { type: "number" },
                  name: { type: "string" },
                  type: { type: "string" },
                  address: { type: "string" },
                  currentRegion: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "식당 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R002" },
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

  console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body); 
    
    const restaurant = await addRestaurant(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).success(restaurant);
  };


 
