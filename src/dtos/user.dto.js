export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  //일단 옵셔널 체이닝(?.)과 기본값 설정(|| [])을 통해 처리
export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences || [];

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };

};