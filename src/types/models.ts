export enum ChannelType {
  EMAIL = "EMAIL",
  SMS = "SMS"
}

export type Customer = {
  id: string;
  fName: string;
  lName: string;
  email: string;
  emailValidated: boolean;
  requireReLogin?: boolean;
  failedLoginAttempts?: number;
  cannotLoginUntil?: Date;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizations?: Organization[];
};

export type Organization = {
  id: string;
  customerId?: string;
  customer?: Customer;
  accounts?: Account[];
  users?: User[];
};

export type Account = {
  id: string;
  organizationId: string;
  authPrimaryToken: string;
  authSecondaryToken?: string;
  Organization?: Organization;
};

export type User = {
  id: string;
  organizationId: string;
  fName: string;
  lName: string;
  role: string;
  Organization?: Organization;
};

export type VerifyServices = {
  id: number;
  sid: string;
  name: string;
  channel?: ChannelType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  verifyServicesUsage?: VerifyServicesUsage[];
};

export type VerifyServicesUsage = {
  id: number;
  verifyServicesId: number;
  emailToVerify: string;
  otp: string;
  generatedOn: Date;
  expireIn: number;
  verified: boolean;
  cost: number;
  VerifyServices?: VerifyServices;
};

export type VariantType = {
  attributes: {
    productAttributeId: number;
    productAttributeValue: number;
  }[]
};

export type MetaInfoType = {
  metaKeywords: string;
  metaDescription: string;
  metaTitle: string;
};