import { StatusCodes } from "http-status-codes";
import { addRestaurant } from "../services/restaurant.service.js";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { listStoreReviews, listStoreMissions } from "../services/restaurant.service.js";

export const handleAddRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body); 
    
    const restaurant = await addRestaurant(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).success(restaurant);
  };

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
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
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );

  res.status(StatusCodes.OK).success(reviews);
};
 
export const handleListStoreMissions = async (req, res, next) => {
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};