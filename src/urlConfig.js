// const baseUrl = process.env.API || "https://"
const baseUrl = "http://10.8.15.179:8001";
// const baseUrl = "http://127.0.0.1:8000";

export const api = `${baseUrl}/api/v1/`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};

