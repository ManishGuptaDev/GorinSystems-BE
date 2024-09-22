import { IRead } from "./IRead";

import { VerifyServicesUsage } from "@/types/models";

export interface IVerifyRepository extends IRead<VerifyServicesUsage> {
   createOtp(item: VerifyServicesUsage): Promise<boolean>;
}