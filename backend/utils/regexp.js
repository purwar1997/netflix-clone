const regexp = {
  name: /^[a-zA-Z ]+$/,
  email: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,60}$/,
};

export default regexp;
