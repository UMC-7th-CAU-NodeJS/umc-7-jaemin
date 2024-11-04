import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";
import { listUserReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await addReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const handleListUserReviews = async (req, res, next) => {
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({ data: reviews });
};