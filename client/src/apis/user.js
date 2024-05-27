import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/users/register",
    data: data,
    method: "post",
  });
export const apiLogin = (data) =>
  axios({
    url: "/users/login",
    data: data,
    method: "post",
  });
