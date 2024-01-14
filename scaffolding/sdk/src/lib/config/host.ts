/**
 * iframe页面的URL 需要有环境区分
 */
import { Type } from './enum';
export const Host = {
  sim: {
    [Type.Upload]: 'https://reactjs.org/docs/hooks-reference.html',
    [Type.GroupList]: 'https://webpack.docschina.org/guides/asset-modules/',
    [Type.GroupSelection]: 'https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/',
  },
  pre: {
    [Type.Upload]: '',
    [Type.GroupList]: '',
    [Type.GroupSelection]: '',
  },
  prod: {
    [Type.Upload]: '',
    [Type.GroupList]: '',
    [Type.GroupSelection]: '',
  },
};
