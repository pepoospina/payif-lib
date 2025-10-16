import type { Hex } from "viem";

export interface CheckoutSessionItem {
  name: string;
  amount: number;
  pricePerUnit: number;
}

export interface StreetAddress {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface Order {
  currency: "USD" | "EUR";
  items: CheckoutSessionItem[];
  deliveryAddress: StreetAddress;
  deliveryDate: number;
  deliveryCarrier: string;
}

export interface CheckoutSession {
  appId: string;
  order: Order;
  recipient: Hex;
  redirectUrl: string;
}

export type CheckoutSessionCreate = {
  session: Omit<CheckoutSession, "appId">;
  templateId?: string;
};

export type CheckoutSessionCreateResult = {
  url: string;
};
