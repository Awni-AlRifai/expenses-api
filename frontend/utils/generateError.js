function generateError({ errors, message}, setError) {
  // Get all error messages as an array
  const errorMessages = Object.entries(errors || message).reduce(
    (acc, [key, value]) => [...acc, ...value],
    []
  );
  // Generate a string of all error messages separated by a newline character
  const errorMessageString = errorMessages.join("\n");
  setError(errorMessageString);
}

export default generateError;
