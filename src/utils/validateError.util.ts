import { errorType } from "../types";

function validationError(errorType: any) {
  const dataError: errorType = {
    NO_CONTENT: {
      code: 204,
      message: "No Content",
    },
    BAD_REQUEST: {
      code: 400,
      message: "Bad Request",
    },
    UNAUTHORIZED: {
      code: 401,
      message: "Unauthorized",
    },
    ["StripeAuthenticationError"]: {
      code: 401,
      message: "Stripe Authentication Error",
    },
    NOT_FOUND: {
      code: 404,
      message: "Not Found",
    },
    ["invalid signature"]: {
      code: 498,
      message: "Invalid Token",
    },
    INTERNAL_SERVER_ERROR: {
      code: 500,
      message: "Internal Server Error",
    },
    NOT_IMPLEMENTED: {
      code: 501,
      message: "Not Implemented",
    },
  };
  return dataError[errorType];
}

export { validationError };
