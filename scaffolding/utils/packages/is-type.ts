const toString = Object.prototype.toString;

export const isType = (value: any, type: string): boolean => {
  return toString.call(value) === '[object ' + type + ']';
}
