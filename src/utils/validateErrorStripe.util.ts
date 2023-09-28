import { errorType } from "../types";

function validationErrorStripe(errorType: any) {
  const dataError: errorType = {
    StripeCardError: {
      code: 400,
      message: "Your card's expiration year is invalid",
    },
    StripeInvalidRequestError: {
      code: 400,
      message: "Your card's expiration year is invalid",
    },
    StripeAPIError: {
      code: 500,
      message: "An error occurred internally with Stripe API",
    },
    StripeConnectionError: {
      code: 500,
      message: "Some kind of error occurred during the HTTPS communication",
    },
    StripeAuthenticationError: {
      code: 500,
      message: "You probably used an incorrect API key",
    },
    StripeRateLimitError: {
      code: 400,
      message: "Too many requests hit the API too quickly",
    },
    StripePermissionError: {
      code: 400,
      message: "You don't have permission to access this resource",
    },
    StripeIdempotencyError: {
      code: 400,
      message:
        "You can't create multiple subscriptions with the same idempotency key",
    },
    StripeInvalidGrantError: {
      code: 500,
      message: "InvalidGrantError is raised when a specified code doesnt exist",
    },
    StripeSignatureVerificationError: {
      code: 500,
      message: "Invalid signature",
    },
  };
  return dataError[errorType];
}

export { validationErrorStripe };
