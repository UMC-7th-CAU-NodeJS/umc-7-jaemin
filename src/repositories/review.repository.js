import { pool } from "../db.config.js";

export const checkRestaurantExists = async (restaurantId) => {
  const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM restaurant WHERE id = ?`, [restaurantId]);
  return rows[0].count > 0;
};

export const createReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO review (restaurant_id, user_id, rate, content) VALUES (?, ?, ?, ?);`,
      [
        data.restaurantId,
        data.userId,
        data.rate,
        data.content
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