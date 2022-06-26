import { adminUrl, agentUrl } from "../data/baseUrls";

const _delAgent = async (id) => {
  var results;

  const url = agentUrl + "remove/" + id;

  await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check your internet connection!",
      });
    });

  return results;
};

export { _delAgent };
