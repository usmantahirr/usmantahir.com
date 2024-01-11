export const validateString = (
  value: FormDataEntryValue | null,
  maxLength: number
): value is string => {
  return !(!value || typeof value !== "string" || value.length > maxLength);
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
