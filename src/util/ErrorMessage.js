export function statusCodeToErrorMessage(error) {
  const code = error.status;
  const message = error.message;
  const errorMessages = {
    "400": "400 - Bad Request.  Something is wrong with how Synapse made this request to a 3rd party API.",
    "401": "401 - Unauthorized.  You may need to sign in, or you may need to connect your Synapse account with a 3rd party account to access this service.",
    "403": "403 - Forbidden.  You do not have permission to access this resource.  You may need to sign in or connect a 3rd party account to your Synapse account.",
    "404": "404 - Not Found.  The requested resource cannot be found.",
    "500": "500 - Internal Server Error.  The server encountered an unexpected condition which prevented it from filling the request.",
    "501": "501 - Not Implemented.  The requested resource has not yet been implemented.  Contact the system administrator to voice interest in this feature.",
    "502": "502 - Bad Gateway.  Something is wrong with the web server configuration.",
    "503": "503 - Service Unavailable.  The requested resource is currently unavailable, perhaps due to regularly scheduled maintenance or overloading.  Please try again later."
  };

  if (code in errorMessages) {
    return errorMessages[code];
  } else {
    return code + " - " + message;
  }
}