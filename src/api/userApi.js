import { handleError } from "./util";
const jwt = require("jsonwebtoken");
const baseUrl = process.env.API_URL + "/auth/login";
const SECRET_KEY = "123456789";
export async function loginUser(credentials) {
  try {
    const fetchResult = fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const response = await fetchResult;
    if (response.ok) {
      const jsonData = await response.json();
      const data = await verifyToken(jsonData);
      const { exp, iat, ...partialObject } = data;
      console.log([partialObject]);
      return partialObject;
    } else if (response.status === 400) {
      return null;
    } else {
      throw Error(await response.text());
    }
  } catch (e) {
    console.log(e);
  }
}

function verifyToken(data) {
  return new Promise((r, e) =>
    jwt.verify(
      data.access_token,
      SECRET_KEY,

      (err, data) => (err ? e(err) : r(data))
    )
  );
}
