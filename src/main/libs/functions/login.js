import { signUrl } from "../data/baseUrls";

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
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check your internet connection",
      });
    });

  return results;
};

export { _login };
