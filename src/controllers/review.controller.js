import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res, next) => {
  /*
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
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "RV001" },
                  reason: { type: "string", example: "리뷰 작성 실패" }
                }
              },
              success: { type: "object", nullable: true, example: null }
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

