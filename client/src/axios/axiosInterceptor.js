import axios from "axios";
import { toast } from "react-toastify";

const createAxiosInstance = (url) => {
  const axiosInstance = axios.create({ url });

  axiosInstance.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      switch (response.status) {
        case 400:
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          return Promise.reject(response.data);
        case 401:
          toast.error("Bạn chưa đăng nhập!");
          return Promise.reject(response.data);
        case 403:
          toast.error("Bạn không có quyền truy cập vào tài nguyên này!");
          return Promise.reject(response.data);
        case 404:
          toast.error("Không tìm thấy tài nguyên!");
          return Promise.reject(response.data);
        case 500:
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          return Promise.reject(response.data);
        case 503:
        case 504:
          toast.error("Máy chủ đang bảo trì, vui lòng thử lại sau!");
          return Promise.reject(response.data);
        case 429:
          toast.error("Quá nhiều yêu cầu, vui lòng thử lại sau!");
          return Promise.reject(response.data);
        case 408:
          toast.error("Yêu cầu đã hết thời gian chờ!");
          return Promise.reject(response.data);
        default:
          return response.data;
      }
    },
    (error) => {
      toast.error("Có lỗi xảy ra khi gửi yêu cầu, vui lòng kiểm tra lại kết nối!");
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const API = axios.create({
  baseURL: "http://localhost:8080/demo_war_exploded", 
});

export const getHello = () => API.get("/api/hello");


export default createAxiosInstance;
