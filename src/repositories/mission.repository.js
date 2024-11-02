import { pool } from "../db.config.js";


export const createMission = async (data) => {
    const conn = await pool.getConnection();
    try{
      const [result] = await conn.query(
        `INSERT INTO mission (restaurant_id, description, score) VALUES (?, ?, ?);` ,
        [
          data.restaurantId,
          data.description,
          data.score
        ]
      );
      return result.insertId;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
  };
  