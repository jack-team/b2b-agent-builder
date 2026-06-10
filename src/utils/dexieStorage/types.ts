export interface DexieStorageRecord {
  key: string;
  value: string;
  updatedAt: number;
}

export type DexieStorageSetValue<ParseValue extends boolean> = ParseValue extends true
  ? unknown
  : string;

export type DexieStorageGetValue<ParseValue extends boolean> = ParseValue extends true
  ? unknown
  : string | null;

export interface DexieStorageLike<ParseValue extends boolean = false> {
  get length(): Promise<number>;
  clear(): Promise<void>;
  getItem(key: string): Promise<DexieStorageGetValue<ParseValue>>;
  key(index: number): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  setItem(key: string, value: DexieStorageSetValue<ParseValue>): Promise<void>;
}
