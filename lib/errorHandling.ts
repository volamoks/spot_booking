export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    // Handle application-specific errors
    console.error(`App Error: ${error.message}`);
    // You might want to show a user-friendly message or redirect to an error page
  } else if (error instanceof Error) {
    // Handle general errors
    console.error(`Unexpected Error: ${error.message}`);
    // You might want to show a generic error message
  } else {
    // Handle unknown errors
    console.error('An unknown error occurred');
    // You might want to show a generic error message
  }
};

