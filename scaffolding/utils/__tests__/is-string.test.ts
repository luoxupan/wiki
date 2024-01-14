import { isString } from '../packages/is-string';

test('isString aaaa to equal 3', () => {
  expect(isString('aaaa')).toBe(true);
});
