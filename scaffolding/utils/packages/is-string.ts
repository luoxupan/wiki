import { isType } from './is-type';

export const isString = (string: any): boolean => {
  return isType(string, 'String');
}
