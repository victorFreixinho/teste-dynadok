import { BaseEntity } from "./BaseEntity";

export interface BaseRepository<T extends BaseEntity> {
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<T | null> ;
    findAll(): Promise<T[]>;
}