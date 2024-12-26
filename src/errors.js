export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.data = data;
    }
  }

  
export class UserNotFoundDBError extends Error {
  errorCode = "U002";

  constructor(reason = "존재하지 않는 사용자입니다.", data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyOngoingError extends Error {
  errorCode = "M001";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionNotFoundDBError extends Error {
  errorCode = "M002";

  constructor(reason = "존재하지 않는 미션입니다.", data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyCompletedError extends Error {
  errorCode = "M003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyExistError extends Error {
  errorCode = "M004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RestaurantNotExistError extends Error {
  errorCode = "R001";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ResataurantAlreadyExistError extends Error {
  errorCode = "R002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
  