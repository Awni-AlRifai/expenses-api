import React from "react";

const ErrorMessage = ({ message }) =>
  message && (
    <div
      className="bg-red-100 border border-red-400 mt-5 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold mr-2">Error:</strong>
      <span className="block sm:inline tracking-tighter">{message}</span>
    </div>
  );

export default ErrorMessage;
