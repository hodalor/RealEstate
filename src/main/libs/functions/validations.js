const _validateAdmin = async (data) => {
  const { firstName, lastName, phone, email, password, address, con_pass } =
    data;

  var results = {
    status: false,
    mesg: "",
  };

  if (
    firstName === "" ||
    lastName === "" ||
    phone === "" ||
    email === "" ||
    password === "" ||
    con_pass === "" ||
    address === ""
  )
    return (results = {
      status: false,
      mesg: "All fields are required!",
    });

  if (phone.length < 10)
    return (results = {
      status: false,
      mesg: "Phone number is not correct!",
    });

  if (password.length < 6)
    return (results = {
      status: false,
      mesg: "Password must be more than 6 characters!",
    });

  if (password !== con_pass)
    return (results = {
      status: false,
      mesg: "Passwords do not match!",
    });

  results = {
    status: true,
    mesg: "",
  };

  return results;
};

const _validateAgent = async (data) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    address,
    con_pass,
    image,
    dob,
    ghcard,
    gr1Name,
    gr1Contact,
    rel1,
    gr2Name,
    gr2Contact,
    rel2,
    gender,
  } = data;

  var results = {
    status: false,
    mesg: "",
  };

  if (
    firstName === "" ||
    lastName === "" ||
    phone === "" ||
    email === "" ||
    password === "" ||
    con_pass === "" ||
    address === "" ||
    image === null ||
    image === undefined ||
    dob === "" ||
    ghcard === "" ||
    gr1Name === "" ||
    gr1Contact === "" ||
    rel1 === "" ||
    gr2Name === "" ||
    gr2Contact === "" ||
    rel2 === "" ||
    gender === ""
  )
    return (results = {
      status: false,
      mesg: "All fields are required!",
    });

  if (phone.length < 10)
    return (results = {
      status: false,
      mesg: "Phone number is not correct!",
    });

  if (gr1Contact.length < 10)
    return (results = {
      status: false,
      mesg: "Guarantor 1 phone number is not correct!",
    });

  if (gr2Contact.length < 10)
    return (results = {
      status: false,
      mesg: "Guarantor 2 phone number is not correct!",
    });

  if (isNaN(phone))
    return (results = {
      status: false,
      mesg: "Phone number is not correct!",
    });

  if (isNaN(gr1Contact))
    return (results = {
      status: false,
      mesg: "Guarantor 1 phone number is not correct!",
    });

  if (isNaN(gr2Contact))
    return (results = {
      status: false,
      mesg: "Guarantor 2 phone number is not correct!",
    });

  if (password.length < 6)
    return (results = {
      status: false,
      mesg: "Password must be more than 6 characters!",
    });

  if (password !== con_pass)
    return (results = {
      status: false,
      mesg: "Passwords do not match!",
    });

  results = {
    status: true,
    mesg: "",
  };

  return results;
};

export { _validateAdmin, _validateAgent };
