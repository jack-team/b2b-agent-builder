import Dexie, { type EntityTable } from 'dexie';
import type {
  DexieStorageGetValue,
  DexieStorageLike,
  DexieStorageRecord,
  DexieStorageSetValue,
} from './types';

const DB_NAME = 'ban-yan-os';
const STORE_NAME = 'records';
// 使用 :: 避免 namespace 前缀误匹配
const NAMESPACE_SEPARATOR = '::';

class AppDexieDatabase extends Dexie {
  records!: EntityTable<DexieStorageRecord, 'key'>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      [STORE_NAME]: 'key, updatedAt',
    });
  }
}

const db = new AppDexieDatabase();

export class DexieStorage<ParseValue extends boolean = false>
  implements DexieStorageLike<ParseValue>
{
  private readonly namespacePrefix: string | null;
  private readonly parseValue: ParseValue;

  /** @param parseValue 为 true 时 setItem 可直接传入对象 */
  constructor(namespace = '', parseValue: ParseValue = false as ParseValue) {
    this.namespacePrefix = namespace ? `${namespace}${NAMESPACE_SEPARATOR}` : null;
    this.parseValue = parseValue;
  }

  private namespacedCollection() {
    if (!this.namespacePrefix) {
      return db.records.orderBy('key');
    }
    return db.records.where('key').startsWith(this.namespacePrefix);
  }

  private toStorageKey(key: string): string {
    return this.namespacePrefix ? `${this.namespacePrefix}${key}` : key;
  }

  private toUserKey(storageKey: string): string {
    if (!this.namespacePrefix) return storageKey;
    return storageKey.slice(this.namespacePrefix.length);
  }

  private serializeValue(value: DexieStorageSetValue<ParseValue>): string {
    if (this.parseValue) {
      return JSON.stringify(value);
    }
    return value as string;
  }

  private deserializeValue(value: string): DexieStorageGetValue<ParseValue> {
    if (this.parseValue) {
      return JSON.parse(value) as DexieStorageGetValue<ParseValue>;
    }
    return value as DexieStorageGetValue<ParseValue>;
  }

  get length() {
    return this.namespacedCollection().count();
  }

  async clear() {
    await this.namespacedCollection().delete();
  }

  async getItem(key: string) {
    const record = await db.records.get(this.toStorageKey(key));
    if (!record) return null;
    return this.deserializeValue(record.value);
  }

  async key(index: number) {
    const keys = (await this.namespacedCollection()
      .offset(index)
      .limit(1)
      .keys()) as string[];
    const storageKey = keys[0];
    return storageKey ? this.toUserKey(storageKey) : null;
  }

  async removeItem(key: string) {
    await db.records.delete(this.toStorageKey(key));
  }

  async setItem(key: string, value: DexieStorageSetValue<ParseValue>) {
    await db.records.put({
      key: this.toStorageKey(key),
      value: this.serializeValue(value),
      updatedAt: Date.now(),
    });
  }
}

export default DexieStorage;
