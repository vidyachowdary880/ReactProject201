import { handleResponse, handleError } from "./util";
const { URLSearchParams } = require("url");
const baseUrl = process.env.API_URL;

export function getPassengerFlightDetails(id) {
  return fetch(baseUrl + "/passengerFlightDetails?flightId=" + id)
    .then(handleResponse)
    .catch(handleError);
}

export function savePassangerServices(passangerServices) {
  return fetch(baseUrl + "/passengerFlightDetails/" + passangerServices.id, {
    method: "PATCH", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passangerServices),
  })
    .then(handleResponse)
    .catch(handleError);
}
