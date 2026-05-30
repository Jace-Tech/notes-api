export class ResponseData {
  public message: string;
  public data: any;
  public success: boolean;

  constructor(message: string, data: any, success: boolean) {
    this.message = message;
    this.data = data;
    this.success = success;
  }

  toJSON() {
    return {
      message: this.message,
      data: this.data,
      success: this.success,
    };
  }
}

export class ResponseUtils {
  static successResponse = ({ data, message }: { message: string; data: any }) => {
    return new ResponseData(message, data, true);
  };

  static errorResponse = ({ data, message }: { message: string; data: any }) => {
    return new ResponseData(message, data, false);
  };
}
