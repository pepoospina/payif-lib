import type {
  CheckoutSessionCreate,
  CheckoutSessionCreateResult,
  InitPaymentPayload,
} from "./types/types.sessions";

export interface PayifClientConfig {
  apiKey: string;
  baseUrl?: string;
}

const DEBUG = true;

export class PayifClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: PayifClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://";
  }

  async createSession(
    sessionData: CheckoutSessionCreate
  ): Promise<CheckoutSessionCreateResult> {
    if (DEBUG) {
      console.log("Creating checkout session...", { sessionData });
    }

    const paymentInit: InitPaymentPayload = {
      session: {
        checkout: sessionData,
      },
    };

    const response = await fetch(`${this.baseUrl}/payments/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(paymentInit),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Unknown error occurred");
    }

    return result.data;
  }
}
