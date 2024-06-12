import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:shop/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    } else return config;

    return config;
  },
  function (error) {
    // do something with error request
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // do something before request is sent
    return response.data;
  },
  function (error) {
    // do something with error request
    return error.response.data;
  }
);

export default instance;
