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