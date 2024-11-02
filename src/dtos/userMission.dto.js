export const bodyToUserMission = (body) => {
	return{
		userId: body.userId,
    missionId: body.missionId,
    status: body.status,
    deadline: body.deadline
  }
}