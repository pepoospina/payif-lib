import type { Hex } from "viem";
import type { MessageCreate } from "./types.messages";

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

export interface SessionPayment {
  chainId: string;
  token: Hex;
  amount: string;
  recipient: Hex;
}

export interface Session {
  payment: SessionPayment;
}

export type CheckoutSession = Session & {
  order: Order;
  redirectUrl: string;
  reviewOn: number;
};

export type CheckoutSessionCreate = {
  payment: SessionPayment;
  order: Order;
  templateId?: string;
  reviewOn: number;
  redirectUrl: string;
};

export type CheckoutSessionCreateResult = {
  url: string;
};

export type GenericSession = Session & { reviewOn: number };

export type GenericSessionCreate = {
  payment: SessionPayment;
  message: MessageCreate;
  reviewOn: number;
  templateId?: string;
};

export type GenericSessionCreateResult = {
  url: string;
};

export interface Seller {
  id: string; // can be userId or appId
  name?: string;
}

export type InitPaymentPayload = {
  message?: MessageCreate;
  session?: {
    checkout?: CheckoutSessionCreate;
    generic?: GenericSessionCreate;
  };
  messageId?: string;
};
