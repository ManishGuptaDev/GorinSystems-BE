import { type PrismaClient } from "@prisma/client";
import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";

export type ModelName = Exclude<keyof PrismaClient, `$${string}`>;

export abstract class EntityRepository<T, K> implements IWrite<T>, IRead<K> {
    protected prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }
    

    // Abstract method to get model name for dynamic access
    protected abstract getModelName(): ModelName

    protected abstract mapToModel(item: T): K

    async create(item: T): Promise<boolean> {
        try {
            const modelName = this.getModelName();
            await (this.prisma[modelName] as any).create({ data: item as any });
            return true;
        } catch (error) {
            console.error("Error creating item:", error);
            return false;
        }
    }

    async getById(id: number): Promise<K> {
        try {
            const modelName = this.getModelName();
            const result = await (this.prisma[modelName] as any).findUnique({ where: { id: id } });
            return this.mapToModel(result);
        } catch (error) {
            console.error("Error retrieving item:", error);
            throw error;
        }
    }

    update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<K[]> {
        const modelName = this.getModelName();
        const results: T[] = await (this.prisma[modelName] as any).findMany();
        return results.map(this.mapToModel);
    }
    find(item: K): Promise<K[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<K> {
        throw new Error("Method not implemented.");
    }

} 