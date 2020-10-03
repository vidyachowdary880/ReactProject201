import { handleResponse, handleError } from "./util";

const baseUrl = process.env.API_URL;

export function getFlights() {
  return fetch(baseUrl + "/flights")
    .then(handleResponse)
    .catch(handleError);
}
