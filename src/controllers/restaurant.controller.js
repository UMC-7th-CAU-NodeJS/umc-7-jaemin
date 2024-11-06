import { StatusCodes } from "http-status-codes";
import { addRestaurant } from "../services/restaurant.service.js";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { listStoreReviews, listStoreMissions } from "../services/restaurant.service.js";

export const handleAddRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body); 
    
    const restaurant = await addRestaurant(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
  };

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({ data: reviews });
};
 
export const handleListStoreMissions = async (req, res, next) => {
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({ data: missions });
};