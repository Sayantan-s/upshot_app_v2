interface PeristenceConfig {
  status: boolean;
  storageKey: string;
  removeIfEmpty?: boolean;
}

interface IStorageInputs<TData> {
  persistenceConfig?: false | PeristenceConfig;
  data: TData;
}

export class StorageManager<TData> {
  private data: TData;
  private persist: false | PeristenceConfig;
  constructor(inputs: IStorageInputs<TData>) {
    this.data = (() => {
      if (
        "persist" in inputs &&
        typeof inputs.persistenceConfig === "object" &&
        "storageKey" in inputs.persistenceConfig
      ) {
        const payload = localStorage.getItem(
          inputs.persistenceConfig.storageKey
        );
        if (payload) return JSON.parse(payload);
        else return inputs.data;
      }
      return inputs.data;
    })();
    this.persist =
      inputs.persistenceConfig && inputs.persistenceConfig.status
        ? inputs.persistenceConfig
        : false;
  }

  public get(): TData;
  public get<K extends keyof TData>(key: K): TData[K];
  public get(key?: keyof TData) {
    if (this.persist) {
      const payload = localStorage.getItem(this.persist.storageKey);
      if (payload) {
        const data = JSON.parse(payload);
        this.data = data as TData;
      }
    }
    return key !== undefined ? this.data[key] : this.data;
  }

  public set(key: keyof TData, value: TData[keyof TData]) {
    this.data[key] = value;
    if (this.persist) {
      localStorage.setItem(this.persist.storageKey, JSON.stringify(this.data));
    }
  }

  public flush(key: keyof TData) {
    delete this.data[key];
    if (this.persist) {
      const payload = localStorage.getItem(this.persist.storageKey);
      if (payload) {
        const data = JSON.parse(payload) as TData;
        delete data[key];
        if (
          this.persist.removeIfEmpty &&
          typeof data === "object" &&
          !Array.isArray(data) &&
          data !== null &&
          !Object.keys(data).length
        )
          localStorage.removeItem(this.persist.storageKey);
        else
          localStorage.setItem(this.persist.storageKey, JSON.stringify(data));
      }
    }
  }

  public flushKeys() {
    this.data = {} as TData;
    if (this.persist) {
      const payload = localStorage.getItem(this.persist.storageKey);
      if (payload) {
        if (this.persist.removeIfEmpty)
          localStorage.removeItem(this.persist.storageKey);
        else localStorage.setItem(this.persist.storageKey, JSON.stringify({}));
      }
    }
  }
}
