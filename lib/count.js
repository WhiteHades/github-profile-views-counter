const MAX_COUNT = Number.MAX_SAFE_INTEGER;

export class Count {
  constructor(count) {
    if (!Number.isSafeInteger(count)) {
      throw new Error('The maximum number of views has been reached');
    }
    if (count < 0) {
      throw new Error('Number of views cannot be negative');
    }
    if (count > MAX_COUNT) {
      throw new Error('The maximum number of views has been reached');
    }
    this.count = count;
  }

  static ofString(value) {
    if (!/^[0-9]+$/.test(value)) {
      throw new Error('The base count must only contain digits');
    }
    return new Count(Number(value));
  }

  toInt() {
    return this.count;
  }

  plus(that) {
    const sum = this.count + that.count;
    if (!Number.isSafeInteger(sum)) {
      throw new Error('The maximum number of views has been reached');
    }
    return new Count(sum);
  }
}
