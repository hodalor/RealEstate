import { adminUrl, agentUrl, customerUrl, propertyUrl, requestsUrl } from "../data/baseUrls";

const _fetchAdmin = async () => {
  var results;

  const url = adminUrl + "getAdmins";

  const adm = await fetch(url).catch((error) => {
    return (results = {
      success: 0,
      message: "Please check your internet connection!",
    });
  });

  results = await adm.json();

  return results;
};

const _fetchAgents = async () => {
  var results;

  const url = agentUrl + "getAgents";

  const agt = await fetch(url).catch((error) => {
    return (results = {
      success: 0,
      message: "Please check your internet connection!",
    });
  });

  results = await agt.json();

  return results;
};

const _fetchProperties = async () => {
  var results;

  const url = propertyUrl + "getProperties";

  const prop = await fetch(url).catch((error) => {
    results = {
      success: 0,
      message: "Please check your internet connection!",
    };
  });

  results = prop === undefined ? results : await prop.json();

  return results;
};

const _fetchReq = async () => {
  var results

  const url = requestsUrl + "getRequests";

  const reqs = await fetch(url).catch((error) => {
    results = {
      success: 0,
      message: "Please check your internet connection!",
    };
  });

  results = reqs === undefined ? results : await reqs.json();

  return results;
};

const _fetchAll = async () => {
  var results;

  const propUrl = propertyUrl + "getProperties";
  const agtUrl = agentUrl + "getAgents";
  const custUrl = customerUrl + "getCustomers";

  await Promise.all([
    fetch(agtUrl).then((response) => response.json()),
    fetch(propUrl).then((response) => response.json()),
    fetch(custUrl).then((response) => response.json()),
  ])
    .then((res) => {
      results = res;
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check your internet connection!",
      });
    });

  return results;
};

export { _fetchAdmin, _fetchAgents, _fetchProperties, _fetchAll, _fetchReq };
