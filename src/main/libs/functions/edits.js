import { adminUrl, agentUrl, customerUrl, propertyUrl } from "../data/baseUrls";

const _editPass = async ({ data, key, admin }) => {
  var results;

  var url = "";
  if (key === "agent") url = agentUrl + "updatePassword/" + data.agent._id;
  if (key === "admin") url = adminUrl + "updatePassword/" + admin._id;
  if (key === "buyer") url = customerUrl + "updatePassword/" + data.buyer._id;

  await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      password: data.user.password,
      new_pass: data.user.new_pass,
      email: data.agent.email,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      console.log(error);
      return (results = {
        success: 0,
        message: "Please check your internet connection!",
      });
    });

  return results;
};

const _editAgent = async (data) => {
  var results;

  const { agent, fields, key, admin, buyer } = data;

  var urlWithImg = "";
  if (key === "agent") urlWithImg = agentUrl + "updateWithImage/" + agent._id;
  if (key === "admin") urlWithImg = adminUrl + "updateWithImage/" + admin._id;
  if (key === "buyer") urlWithImg = customerUrl + "updateWithImage/" + buyer._id;

  var url = "";
  if (key === "agent") url = agentUrl + "update/" + agent._id;
  if (key === "admin") url = adminUrl + "update/" + admin._id;
  if (key === "buyer") url = customerUrl + "update/" + buyer._id;

  if (fields.image !== undefined) {
    var formData = new FormData();

    var objData = "";

    const agnt = JSON.stringify({
      firstName: fields.firstName === "" ? agent.firstName : fields.firstName,
      lastName: fields.lastName === "" ? agent.lastName : fields.lastName,
      phone: fields.phone === "" ? agent.phone : fields.phone,
      email: fields.email === "" ? agent.email : fields.email,
      address: fields.address === "" ? agent.address : fields.address,
      fbAct: fields.fb === "" ? agent.fbAct : fields.fb,
      twAct: fields.tw === "" ? agent.twAct : fields.tw,
      insAct: fields.ins === "" ? agent.insAct : fields.ins,
      isBlocked: fields.isBlocked ? fields.isBlocked : agent.isBlocked,
    });

    const adm = JSON.stringify({
      firstName: fields.firstName === "" ? admin.firstName : fields.firstName,
      lastName: fields.lastName === "" ? admin.lastName : fields.lastName,
      phone: fields.phone === "" ? admin.phone : fields.phone,
      email: fields.email === "" ? admin.email : fields.email,
      address: fields.address === "" ? admin.address : fields.address,
    });

    const by = JSON.stringify({
      firstName: fields.firstName === "" ? buyer.firstName : fields.firstName,
      lastName: fields.lastName === "" ? buyer.lastName : fields.lastName,
      phone: fields.phone === "" ? buyer.phone : fields.phone,
      email: fields.email === "" ? buyer.email : fields.email,
    });

    if (key === "agent") objData = agnt;
    if (key === "admin") objData = adm;
    if (key === "buyer") objData = by;

    formData.append("profileImg", fields.image);
    formData.append("data", objData);
    await fetch(urlWithImg, {
      method: "PATCH",
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
  }

  if (fields.image === undefined) {
    await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: objData,
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
  }

  return results;
};

const _blockAgnt = async (data) => {
  var results;

  const { agent, fields } = data;

  const url = agentUrl + "update/" + agent._id;

  await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: fields.firstName === "" ? agent.firstName : fields.firstName,
      lastName: fields.lastName === "" ? agent.lastName : fields.lastName,
      phone: fields.phone === "" ? agent.phone : fields.phone,
      email: fields.email === "" ? agent.email : fields.email,
      address: fields.address === "" ? agent.address : fields.address,
      fbAct: fields.fb === "" ? agent.fbAct : fields.fb,
      twAct: fields.tw === "" ? agent.twAct : fields.tw,
      insAct: fields.ins === "" ? agent.insAct : fields.ins,
      isBlocked: true,
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

const _unblockAgnt = async (data) => {
  var results;

  const { agent, fields } = data;

  const url = agentUrl + "update/" + agent._id;

  await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: fields.firstName === "" ? agent.firstName : fields.firstName,
      lastName: fields.lastName === "" ? agent.lastName : fields.lastName,
      phone: fields.phone === "" ? agent.phone : fields.phone,
      email: fields.email === "" ? agent.email : fields.email,
      address: fields.address === "" ? agent.address : fields.address,
      fbAct: fields.fb === "" ? agent.fbAct : fields.fb,
      twAct: fields.tw === "" ? agent.twAct : fields.tw,
      insAct: fields.ins === "" ? agent.insAct : fields.ins,
      isBlocked: false,
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

const _approveProperty = async (_id) => {
  var results;

  const url = propertyUrl + "update/" + _id;

  await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isApproved: true,
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

export { _editPass, _editAgent, _blockAgnt, _unblockAgnt, _approveProperty };
