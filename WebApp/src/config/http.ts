import { Env } from '../services';

export const Host: any = {
  development: 'http://test-aaa.com',
  test: '',
  pre: '',
  sim: '',
  production: '',
};

export const Misauth: any = {
  get logout() {
    let url = `http://mis-test.xxx.com.cn/auth/ldap/logout?app_id=2100149&jumpto=${encodeURIComponent(window.location.origin)}`;
    if (Env.isProd) {
      url = `https://mis-auth.xxx.com/auth/ldap/logout?app_id=2534&jumpto=${encodeURIComponent(window.location.origin)}&callback_index=0`;
    }
    return url;
  },
  get login() {
    let loginUrl = 'http://mis-test.xxx.com.cn/auth/sso/login?app_id=2100149&version=1.0';
    if (Env.isProd) {
      loginUrl = 'https://mis-auth.xxx.com/auth/sso/login?app_id=2534&version=1.0';
    }
    return `${loginUrl}&jumpto=${encodeURIComponent(window.location.href)}`;
  },
};
