export interface IRead<T> {
    getById(id: number): Promise<T>;
    getAll(): Promise<T[]>;
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
  }