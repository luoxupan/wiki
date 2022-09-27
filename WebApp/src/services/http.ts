import { Host, Misauth } from 'config';
import { Env } from './env';
import axios from 'axios';

export const http = axios.create({
  baseURL: `${Host[Env.env || '']}`,
  withCredentials: true,
  headers: {
    'Accept-Language': 'zh-CN',
  },
});

// 本地需要重新种cookie
if (Env.isDev) {
  const url = `${Host[Env.env || '']}/platapi/getCookie`;
  axios.get(url, { withCredentials: true }).then(res => {
    (res.data?.data || '').split(';').map((item: any) => {
      document.cookie = item.trim();
    });
  });
}

http.interceptors.request.use((req) => {
  req.params = {
    ...req.params,
    lang: 'zh-CN',
  };
  if (req.data instanceof FormData) return req;
  req.data = {
    request_version: 2,
    ...req.data,
  };
  return req;
}, (err) => {
  return Promise.reject(err);
});

export async function genHttpRequest<T>(options: any) {
  try {
    const { data } = await http(options);
    const status = data?.errno || data?.errcode || data?.status || 0;
    if ([401].includes(status)) {
      // to login
      window.location.href = Misauth.login;
      return;
    }
    if (![0, 200, 10000].includes(status)) {
      throw new Error(JSON.stringify({ status: data.errno, message: data.errmsg }));
    }
    return data;
  } catch (e) {
    if (options.onError) return options.onError(e);
    throw e;
  }
}

// 使用示例
// static async submitTest(data) {
//   return await genHttpRequest({
//     method: 'POST',
//     url: '/api/v1/product/submitTest',
//     data: {
//       data
//     },
//   });
// }
