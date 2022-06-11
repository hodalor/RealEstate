import { adminUrl, agentUrl } from "../data/baseUrls";

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

export { _createAdmin, _addAgent };
