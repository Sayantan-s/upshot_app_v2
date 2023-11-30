export default class UtilityFuncs {
  static pick<T, K extends keyof T>(obj: T, ...keys: K[]) {
    const ret = {} as NonNullable<Pick<T, K>>;
    keys.forEach((key) => {
      ret[key] = obj[key];
    });
    return ret;
  }
}
