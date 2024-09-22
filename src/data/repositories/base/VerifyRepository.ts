import { VerifyServicesUsage } from "@prisma/client";
import { VerifyServicesUsage as Model } from "@/types/models";
import prisma from "@/lib/prismaClient";
import { IVerifyRepository } from "../interfaces/IVerifyRepository";
import { EntityRepository, ModelName } from "./EntityRepository";

export class VerifyRepository extends EntityRepository<VerifyServicesUsage, Model> implements IVerifyRepository {

    constructor() {
        super(prisma); // Pass the Prisma client to the base class
    }

    protected getModelName(): ModelName {
        return "verifyServicesUsage"; // Return the name of the model as defined in Prisma
    }

    protected mapToModel(item: VerifyServicesUsage): Model {
        return {
            id: item.id,
            otp: item.otp,
            emailToVerify: item.emailToVerify,
            generatedOn: item.generatedOn,
            expireIn: item.expireIn,
            verified: item.verified,
            cost: parseFloat(item.cost.toString()), // Convert Decimal to number using toString()
            verifyServicesId: item.verifyServicesId,
            VerifyServices: undefined
        };
   
    }

    async createOtp(item: Model): Promise<boolean> {
        const entity = await prisma.verifyServicesUsage.create({ 
            data: {
                emailToVerify: item.emailToVerify,
                otp: item.otp,
                generatedOn: item.generatedOn,
                expireIn: item.expireIn,
                verified: item.verified,
                cost: item.cost,
                verifyServicesId: item.verifyServicesId
            }
         });

        return entity !== null;
    }       
}