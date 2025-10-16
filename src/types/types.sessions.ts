import type { Hex } from "viem";

export interface CheckoutItem {
  name: string;
  amount: number;
  pricePerUnit: number;
}

export interface StreetAddress {
  country?: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface Order {
  currency: "USD" | "EUR";
  items: CheckoutItem[];
  deliveryAddress: StreetAddress;
  deliveryDate: number;
  deliveryCarrier: string;
}

export interface Session<Payload> {
  appId: string;
  payment: {
    chainId: string;
    token: Hex;
    amount: string;
    recipient: Hex;
  };
  type: "checkout" | "generic";
  payload: Payload;
  redirectUrl: string;
}

export type CheckoutSession = Session<Order>;

export type CheckoutSessionCreate = {
  session: Omit<CheckoutSession, "appId">;
  templateId?: string;
};

export type CheckoutSessionCreateResult = {
  url: string;
};

export type GenericSession = Session<{ messageId: string }>;

export type GenericSessionCreate = {
  session: Omit<GenericSession, "appId">;
  templateId?: string;
};

export type GenericSessionCreateResult = {
  url: string;
};
