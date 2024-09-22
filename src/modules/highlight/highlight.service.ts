import { Highlight } from 'prisma/prisma-client'

import prisma from '@/lib/prismaClient'

class HighlightService {
    constructor() {
    }

    async getAll(): Promise<Highlight[]> {
        try {
            const items = await prisma.highlight.findMany({
                where: {
                    isDeleted: false, // Only retrieve highlights that are not deleted
                },
            });
            return items;
        } catch (error) {
            console.error("Error retrieving items:", error);
            throw new Error("Could not retrieve items");
        }
    }

    async post(text: string, order: number): Promise<Highlight> {
        try {
            const item = await prisma.highlight.create({
                data : {
                    text,
                    order,
                    isDeleted: false
                }
            });
            return item;
        } catch (error) {
            console.error("Error creating item:", error);
            throw new Error("Could not create item");
        }
    }

    async deleteById(id: number): Promise<Highlight> {
        try {
            const item = await prisma.highlight.update({
                where: {
                    id
                },
                data: {
                    isDeleted: true
                }
            });
            return item;
        } catch (error) {
            console.error("Error deleting item:", error);
            throw new Error("Could not delete item");
        }
    }

    async updateById(id: number, text: string, order: number): Promise<Highlight> {
        try {
            const item = await prisma.highlight.update({
                where: {
                    id
                },
                data: {
                    text,
                    order
                }
            });
            return item;
        } catch (error) {
            console.error("Error updating item:", error);
            throw new Error("Could not update item");
        }
    }


}

export default HighlightService;