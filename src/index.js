import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddRestaurant } from "./controllers/restaurant.controller.js"; 
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleStartMission } from "./controllers/userMission.controller.js";
import { handleListUserReviews } from "./controllers/user.controller.js";
import { handleListStoreReviews, handleListStoreMissions } from "./controllers/restaurant.controller.js";
import { handleListUserMissions } from "./controllers/userMission.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/restaurants", handleAddRestaurant); 
app.post("/api/v1/reviews", handleAddReview);
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/user-missions", handleStartMission);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/users/:userId/user-missions", handleListUserMissions);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});