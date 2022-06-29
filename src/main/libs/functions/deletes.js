import { adminUrl, agentUrl, propertyUrl, requestsUrl } from "../data/baseUrls";

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

const _delNoti = async (id) => {
  var results;

  const url = requestsUrl + "remove/" + id;

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

const _delProp = async (data) => {
  var results;

  const url = propertyUrl + "remove/" + data.id;

  await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      agentID: data.agentID,
    }),
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

const _sellProp = async (data) => {
  var results;

  const url = propertyUrl + "sell/" + data.id;

  await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      agentID: data.agentID,
    }),
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

export { _delAgent, _delNoti, _delProp, _sellProp };
