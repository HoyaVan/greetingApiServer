// User-facing strings centralized in one module
export const strings = {
  // Date/Greeting messages
  greeting: "Hello %1, What a beautiful day. Server current date and time is",
  
  // Error messages
  badRequestMissingText: "Bad Request: missing ?text=...",
  serverErrorWrite: "Server Error: Unable to write to file",
  serverErrorRead: "Server Error: Unable to read file",
  notFound404File: "404 Not Found: file \"%1\"",
  notFound: "Not Found",
  
  // Success messages
  appendedToFile: "Appended \"%1\" to file.txt",
  
  // Server messages
  serverRunning: "Server running at http://localhost:%1"
};
