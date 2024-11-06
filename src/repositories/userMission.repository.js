import { prisma } from '../db.config.js';

export const checkMissionOngoing = async (userId, missionId) => {
  const count = await prisma.userMission.count({
    where: {
      userId: userId,
      missionId: missionId,
      status: '진행 중'
    }
  });
  return count > 0;
};

export const addUserMission = async (data) => {
  const createdUserMission = await prisma.userMission.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      status: '진행 중',
      deadline: new Date(data.deadline) // Assuming 'deadline' is a valid date string
    }
  });
  return createdUserMission.id;
};

export const getUserMissionsByStatus = async (userId, status, cursor) => {
  const userMissions = await prisma.userMission.findMany({
    select: { id: true, status: true, missionId: true, userId: true, deadline: true },
    where: { userId: userId, status: status, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });

  return userMissions;
}; 