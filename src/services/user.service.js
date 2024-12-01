import { bodyToUser, responseFromUser } from '../dtos/user.dto.js';
import { DuplicateUserEmailError, UserNotFoundDBError } from '../errors.js';
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllUserReviews,
  patchUser,
} from "../repositories/user.repository.js";
import { responseFromReviews } from '../dtos/review.dto.js';


export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    preferences: data.preferences,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const updateUserInfo = async (userId, toBeUpdated) => {
  const user = await getUser(parseInt(userId, 10));
  if (!user) {
    throw new UserNotFoundDBError("사용자를 찾을 수 없습니다.", userId); // 왜 여기서 에러를 처리 안 하고 전역 에러 처리기로 넘기는지?
  }


  // 업데이트 할 필드 목록
  const allowedFields = [
    "gender",
    "birth",
    "address",
    "detailAddress",
    "phoneNumber",
    "preferences",
  ];

  const filteredUpdates = Object.fromEntries(
    Object.entries(toBeUpdated).filter(([key]) => allowedFields.includes(key))
  );

  const updatedUser = await patchUser(userId, filteredUpdates);

  // 업데이트된 사용자 정보 반환
  return bodyToUser(updatedUser);
};

export const listUserReviews = async (userId, cursor) => {
  const reviews = await getAllUserReviews(userId,cursor);
  return responseFromReviews(reviews);
};