export function fetchErrorThrower(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchToJson = (response) => response.json();