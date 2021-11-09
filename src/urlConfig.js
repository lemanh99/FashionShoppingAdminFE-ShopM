// const baseUrl = process.env.API || "https://"
//const baseUrl = "http://localhost:2000";
const baseUrl = " http://10.8.15.46:8000";

export const api = `${baseUrl}/api/v1/`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};

