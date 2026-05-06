import { customerUrl, signUrl } from "../data/baseUrls";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return {
    success: response.ok ? 1 : 0,
    message: text || "Unexpected server response",
  };
};

const _login = async (data) => {
  var results;

  const { email, password } = data;

  const url = signUrl + "login";

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => parseResponse(response))
    .then((res) => {
      return (results = res);
    })
    .catch(() => {
      return (results = {
        success: 0,
        message: "Unable to reach the server. Please confirm the backend is running.",
      });
    });

  return results;
};

const _register = async (data) => {
  var results;

  const { email, password, firstName, lastName, phone } = data;

  const url = customerUrl + "create";

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: "Buyer",
    }),
  })
    .then((response) => parseResponse(response))
    .then((res) => {
      return (results = res);
    })
    .catch(() => {
      return (results = {
        success: 0,
        message: "Unable to reach the server. Please confirm the backend is running.",
      });
    });

  return results;
};

export { _login, _register };
