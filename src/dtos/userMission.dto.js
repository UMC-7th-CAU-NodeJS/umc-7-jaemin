export const bodyToUserMission = (body) => {
	return{
		userId: body.userId,
    missionId: body.missionId,
    status: body.status,
    deadline: body.deadline
  }
}

export const responseFromUserMissions = (userMissions) => {
  return {
    data: userMissions,
    pagination: {
      cursor: userMissions.length ? userMissions[userMissions.length - 1].id : null,
    },
  };
};