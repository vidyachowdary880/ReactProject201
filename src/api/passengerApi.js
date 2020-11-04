import { handleResponse, handleError } from "./util";
const { URLSearchParams } = require("url");
const baseUrl = process.env.API_URL;

export function getPassengerFlightDetails(id) {
  return fetch(baseUrl + "/passengerFlightDetails?flightId=" + id)
    .then(handleResponse)
    .catch(handleError);
}

export function getPassengerDetailsById(id) {
  return fetch(baseUrl + "/passengers?id=" + id)
    .then(handleResponse)
    .catch(handleError);
}

export function getAllPassengerFlightDetails() {
  return fetch(baseUrl + "/passengerFlightDetails")
    .then(handleResponse)
    .catch(handleError);
}


export function getAllPassengerDetails() {
  return fetch(baseUrl + "/passengers")
    .then(handleResponse)
    .catch(handleError);
}


export function savePassangerServices(passangerServices) {
  return fetch(baseUrl + "/passengerFlightDetails/" + passangerServices.id, {
    method: "PATCH",  
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passangerServices),
  })
    .then(handleResponse)
    .catch(handleError);
}


export function updatePassangerDetails(passangerDetails) {
  return fetch(baseUrl + "/passengers/" + passangerDetails.id, {
    method: "PATCH",  
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passangerDetails),
  })
    .then(handleResponse)
    .catch(handleError);
}
