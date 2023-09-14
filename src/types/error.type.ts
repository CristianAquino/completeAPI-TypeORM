interface DataError {
  code: number;
  message: string;
}

type errorType = { [key: string]: DataError };

export { errorType };
