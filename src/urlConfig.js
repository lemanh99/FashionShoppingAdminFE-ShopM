// const baseUrl = process.env.API || "https://"
const baseUrl = "http://10.8.15.77:8001";
// const baseUrl = "http://127.0.0.1:8000";
// const baseUrl = process.env.BASE_URL_API || "http://127.0.0.1:8000"

export const api = `${baseUrl}/api/v1/`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};

