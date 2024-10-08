import { adminUrl, agentUrl, propertyUrl, requestsUrl } from "../data/baseUrls";

const _createAdmin = async (data) => {
  var results;

  const url = adminUrl + "create";

  const formData = new FormData();

  const admin = JSON.stringify({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    address: data.address,
    role: "Admin",
  });

  formData.append("profileImg", data.image);
  formData.append("data", admin);

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    })
    .catch((error) => {
      results = {
        success: 0,
        message: "Please check your internet connection!",
      };
    });

  return results;
};

const _addAgent = async (data) => {
  var results;

  const url = agentUrl + "create";

  const formData = new FormData();

  const agent = JSON.stringify({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    address: data.address,
    role: "Agent",
    dob: data.dob,
    ghanaCard: data.ghcard,
    gr1: data.gr1Name,
    gr1Contact: data.gr1Contact,
    gr1Relation: data.rel1,
    gr2: data.gr2Name,
    gr2Contact: data.gr2Contact,
    gr2Relation: data.rel2,
    fbAct: data.fb,
    twAct: data.tw,
    insAct: data.ins,
  });

  formData.append("profileImg", data.image);
  formData.append("data", agent);

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    })
    .catch((error) => {
      results = {
        success: 0,
        message: "Please check your internet connection!",
      };
    });

  return results;
};

const _addProperty = async (data) => {
  var results;

  const url = propertyUrl + "create";

  var formData = new FormData();

  await data.propImages.forEach((image) => {
    formData.append("propImage", image);
  });

  formData.append("data", JSON.stringify(data));

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check you internet connection!",
      });
    });

  return results;
};

const _sendRequest = async ({ data, buyer }) => {
  var results;

  const url = requestsUrl + "create";

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userName: buyer.firstName + " " + buyer.lastName,
      userContact: buyer.phone,
      userID: buyer._id,
      agentID: data.agentID,
      property: data,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check you internet connection!",
      });
    });

  return results;
};

export { _createAdmin, _addAgent, _addProperty, _sendRequest };
