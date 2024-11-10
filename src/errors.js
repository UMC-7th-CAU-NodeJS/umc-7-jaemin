export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
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

export class NoRestaurant extends Error {
  errorCode = "R001";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
  