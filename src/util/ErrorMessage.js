export function statusCodeToErrorMessage(error) {
  const code = error.status;
  const message = error.message;

  if (code === 400) {
    return "400 - Bad Request.  Something is wrong with how Synapse made this request to a 3rd party API.";
  } else if (code === 401) {
    return "401 - Unauthorized.  You may need to sign in, or you may need to connect your Synapse account with a 3rd party account to access this service.";
  } else if (code === 403) {
    return "403 - Forbidden.  You may not have permission to access this resource.";
  } else if (code === 404) {
    return "404 - Not Found.  The requested resource cannot be found.";
  } else if (code === 500) {
    return "500 - Internal Server Error.  The server encountered an unexpected condition which prevented it from filling the request.";
  } else if (code === 501) {
    return "501 - Not Implemented.  The requested resource has not yet been implemented.  Contact the system administrator to voice interest in this feature.";
  } else if (code === 502) {
    return "502 - Bad Gateway.  Something is wrong with the web server configuration.";
  } else if (code === 503) {
    return "503 - Service Unavailable.  The requested resource is currently unavailable, perhaps due to regularly scheduled maintenance or overloading.  Please try again later.";
  } else {
    return code + " - " + message;
  }
}