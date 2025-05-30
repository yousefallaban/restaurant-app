import axios from 'axios';

export const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject({ canceled: true, message: 'Request canceled' });
    }

    if (error.response) {
      const { status, data, headers } = error.response;
      return Promise.reject({
        status,
        data,
        headers,
        message: error.message,
      });
    }

    if (error.request) {
      return Promise.reject({
        message: 'No response received from server',
        request: error.request,
      });
    }

    return Promise.reject({
      message: error.message,
    });
  }
);

async function fetcher({
  endpoint,
  method = 'GET',
  data = null,
  params = null,
  headers = {},
  signal,
}) {
  const httpMethod = method.toUpperCase();

  try {
    const response = await instance.request({
      url: endpoint,
      method: httpMethod,
      data,
      params,
      headers,
      signal,
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}: ${error.message}`);
    throw error;
  }
}

export default fetcher;
