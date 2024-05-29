import axios from "../axios";

export const apiGetCategories = (data) => {
  return axios({
    url: "/categories",
    data: categories,
    method: "get",
  });
};
