export interface ApiError {
    statusCode: number;
    error: string;
    message: string;
    timestamp: string;
    path: string;
  }