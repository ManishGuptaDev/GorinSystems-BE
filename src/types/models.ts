export type User = {
  id: number;
  surfaceTagId: string;
  createdAt: Date;
};

export type Event = {
  id: number;
  name: string;
  metadata: object;
  surfaceTagId: string;
  visitorId: string;
  createdAt: Date;
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