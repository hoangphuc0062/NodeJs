import axios from "../axios";

export default function getProducts(params) {
  return axios({
    url: "/products",
    method: "get",
    params,
  });
}
export function apiGetProduct(pid) {
  return axios({
    url: "/products/" + pid,
    method: "get",
  });
}

export const apiGetProducts = () => {
  return axios({
    url: "/products",
    method: "get",
  });
};
export const apiDeleteProduct = (_id) => {
  return axios({
    url: `/products/${_id}`,
    method: "delete",
  });
};
