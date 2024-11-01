import { pool } from "../db.config.js";

export const checkMissionOngoing = async (userId, missionId) => {
  const [results] = await pool.query(
      `SELECT 1 FROM userMission WHERE user_id = ? AND mission_id = ? AND status = '진행 중' LIMIT 1`,
      [userId, missionId]
  );
  return results.length > 0;
};

export const addUserMission = async (data) => {
  const conn = await pool.getConnection();
  try {
      const [result] = await conn.query(
          `INSERT INTO userMission (user_id, mission_id, status, deadline) VALUES (?, ?, ?, ?);`,
          [
            data.userId,
            data.missionId,
            "진행 중",
            data.deadline 
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