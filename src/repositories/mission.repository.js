import { prisma } from '../db.config.js';

export const createMission = async (data) => {
  const createdMission = await prisma.mission.create({
    data: {
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score
    }
  });
  return createdMission.id;
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({
    where: { id: missionId }
  });
  return mission;
}

export const checkMissionExists = async (data) => {
  const count = await prisma.mission.count({
    where: {
      restaurantId: data.restaurantId,
      description: data.description,
      score: data.score
    }
  });
  return count > 0;
}