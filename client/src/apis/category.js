import axios from "../axios";

export const apiGetCategories = () =>
  axios({
    url: "/categories/",
    method: "get",
  });
export const apiAddCategory = (data) =>
  axios({
    url: "/categories/create",
    data: data,
    method: "post",
  });

export const apiDeleteCategory = (_id) =>
  axios({
    url: `/categories/${_id}`,
    method: "delete",
  });

export const apiUpdateCategory = (_id, data) =>
  axios({
    url: `/categories/${_id}`,
    data: data,
    method: "put",
  });
