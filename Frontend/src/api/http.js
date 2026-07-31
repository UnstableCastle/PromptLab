import axiosInstance from "./axios";

const get = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

const post = async (url, body = {}, config = {}) => {
const response = await axiosInstance.post(url, body, config);
  return response.data;
};

const put = async (url, body = {}, config = {}) => {
  const response = await axiosInstance.put(url, body, config);
  return response.data;
};

const patch = async (url, body = {}, config = {}) => {
  const response = await axiosInstance.patch(url, body, config);
  return response.data;
};

const remove = async (url, config = {}) => {
  const response = await axiosInstance.delete(url, config);
  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: remove,
};
