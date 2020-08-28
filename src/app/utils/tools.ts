export class Tools {
  static createKeyForQueryCache = (prefix: string, obj: any) =>
    Object.keys(obj).length
      ? `${prefix}_${Object.entries(obj)
          .map(([k, v]) => `${k}_${v}`)
          .join('_')}`
      : prefix;
}
