export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype); // Only because we are extending a built in class
  }
}
