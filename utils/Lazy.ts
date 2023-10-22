export class Lazy<T> {
  private _value: T | undefined;
  private loaded: boolean = false;

  constructor(private init: () => T) { }

  get value(): T {
    if (this.loaded === false) {
      this._value = this.init();
      this.loaded = true;
    }

    return this._value!;
  }
}
