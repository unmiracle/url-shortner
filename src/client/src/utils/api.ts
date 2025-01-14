import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_HOST || "",
  validateStatus: (status) => status >= 200 && status < 500,
});

// export const addAuthorizationHeader = (accessToken: string) => {
//   api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
// }
