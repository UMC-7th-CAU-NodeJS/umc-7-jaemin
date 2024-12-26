import { prisma } from '../db.config.js';

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }

  const birthDate = new Date(data.birth).toISOString();

  const created = await prisma.user.create({ data: data });
  return created.id;
};
// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodId) => {
  await prisma.userFood.create({
    data: {
      userId: userId,
      foodId: foodId,
    },
  });
};

export const patchUser = async (userId, toBeUpdated) => {
  return await prisma.user.update({
    where: { id: parseInt(userId, 10) },
    data: toBeUpdated,
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFood.findMany({
    select: {
      id: true,
      userId: true,
      foodId: true,
    },
    where: { userId: userId },
    orderBy: { foodId: "asc" },
  });

  return preferences;
};


export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, content: true, restaurantId: true, userId: true },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });
  return reviews;
};

