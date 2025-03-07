import { Model } from "mongoose";
import { BaseEntity } from "./BaseEntity";
import { BaseRepository } from "./BaseRepository";

export abstract class BaseRepositoryImpl<T extends BaseEntity> implements BaseRepository<T> {
    
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate({ id }, data, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.model.deleteOne({ id });
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findOne({ id });
    }

    async findAll(): Promise<T[]> {
        return await this.model.find();
    }
}