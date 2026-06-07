export class Utils {
  static filterObjects<T>(data: T, ...args: (keyof T)[]) {
    const filteredData: T = {} as T;
    for (const key in data) {
      if (args.includes(key)) {
        continue;
      }
      filteredData[key] = data[key];
    }
    return filteredData;
  }

  static pickObjects<T>(data: T, ...args: (keyof T)[]) {
    const filteredData: T = {} as T;
    for (const key in data) {
      if (!args.includes(key)) {
        continue;
      }
      filteredData[key] = data[key];
    }
    return filteredData;
  }

  static getExpDate(secs: number) {
    return Math.floor(Date.now() / 1000) + secs;
  }

  static getDateInISO(secs: number) {
    return new Date(secs * 1000).toISOString();
  }
}
