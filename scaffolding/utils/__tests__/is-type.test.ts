import { isType } from '../packages/is-type';

test('isType 123 to equal Number', () => {
  expect(isType(123, 'Number')).toBe(true);
});
