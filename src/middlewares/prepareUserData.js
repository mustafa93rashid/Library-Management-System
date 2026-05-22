const prepareUserData = (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    address,
    dateOfBirth,
    membershipNumber,
    responsibleDepartment,
  } = req.body;

  req.userData = {
    name,
    email,
    phone,
    password,
    role,
  };

  if (role === "member") {
    req.userData.member = {
      address,
      dateOfBirth,
      membershipNumber,
    };
  }

  if (role === "librarian") {
    req.userData.librarian = {
      responsibleDepartment,
    };
  }

  next();
};

module.exports = prepareUserData;