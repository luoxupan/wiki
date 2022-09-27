export class Env {
  static env = process.env.WEB_ENV as any;

  static isDev = Env.env === 'development';

  static isTest = Env.env === 'test';

  static isProd = Env.env === 'production';

  static isIframe = window.top !== window.self || window.location.search.includes('type=iframe');
}
