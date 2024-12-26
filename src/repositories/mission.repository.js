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

export const getAllStoreMissions = async (restaurantId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: { id: true, description: true, restaurantId: true, score: true },
    where: { restaurantId: restaurantId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });

  return missions;
}; 