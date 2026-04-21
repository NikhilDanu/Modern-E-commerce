import axios from "axios";
const API = axios.create({
  baseURL:  "http://localhost:5000/api",
});

API.interceptors.request.use(
  (req)=>{
    const token = localStorage.getItem("token");
     if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
   (error) => Promise.reject(error)
);
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

export const createProduct = (data) =>
  API.post("/product/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  export const getAllProducts = (data) => API.get("/product" , data);
  export const addCart = (data) => API.post("/cart/add" , data);
  export const getCart = (data) => API.get("/cart/");
 export const createOrder = (data) => API.post("/order", data);
export const createPayment = () =>
  API.post("/payment/create-order");

export const verifyPayment = (data) =>
  API.post("/payment/verify", data);
