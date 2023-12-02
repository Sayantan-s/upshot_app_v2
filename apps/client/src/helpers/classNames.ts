export const isObject = (className: unknown) =>
  className !== null &&
  !Array.isArray(className) &&
  typeof className === 'object';

export const classNames = (...args: unknown[]) => {
  const result: string[] = [];
  args.forEach((className) => {
    if (!!!className) return;
    else if (isObject(className)) {
      for (const [key, value] of Object.entries(className)) {
        if (value) result.push(key);
      }
    } else if (Array.isArray(className)) {
      result.push(classNames(...className));
    } else result.push(className as string);
  });
  return result.join(' ');
};
