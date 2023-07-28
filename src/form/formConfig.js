export const userNameConfig = {
  label: "User name",
  id: "userName",
  placeholder: "Enter user name",
  validation: {
    required: {
      value: true,
      message: "User name is required",
    },
    minLength: {
      value: 5,
      message: "Min length 5 required",
    },
    pattern: {
      value: /^[\w@_-\s]+$/,
      message: "Value not allowed",
    },
  },
};

export const passwordConfig = {
  label: "Password",
  id: "password",
  placeholder: "Enter Password",
  password: true,
  validation: {
    required: {
      value: true,
      message: "Password is required",
    },
    minLength: {
        value: 5,
        message: "Min length 5 required"
    },
    pattern: {
      value: /^[\w@_-\s]+$/,
      message: "",
    },
  },
};
