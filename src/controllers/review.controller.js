import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";
import { listStoreReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.tags = ['리뷰 관련'];
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" },
              restaurantId: { type: "integer" },
              content: { type: "string" },
              rating: { type: "integer" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 작성 성공 응답",
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
                  userId: { type: "integer" },
                  restaurantId: { type: "integer" },
                  content: { type: "string" },
                  rating: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await addReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.tags = ['리뷰 관련'];
    #swagger.summary = '식당별 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "식당별 리뷰 목록 조회 성공 응답",
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