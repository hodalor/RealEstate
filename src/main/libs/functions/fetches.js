import { adminUrl, agentUrl } from "../data/baseUrls";

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

const _fetchAll = async () => {
  var results;

  //   const adUrl = adminUrl + "getAdmins";
  const agtUrl = agentUrl + "getAgents";

  await Promise.all([
    // fetch(adUrl).then((response) => response.json()),
    fetch(agtUrl).then((response) => response.json()),
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

export { _fetchAdmin, _fetchAgents, _fetchAll };
