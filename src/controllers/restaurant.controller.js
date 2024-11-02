import { StatusCodes } from "http-status-codes";
import { addRestaurant } from "../services/restaurant.service.js";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";

export const handleAddRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body); 
    
    const restaurant = await addRestaurant(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
  };