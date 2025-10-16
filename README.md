# Payif SDK

A simple and lightweight SDK for the Payif API.

## Installation

```bash
yarn add payif
# or
npm install payif
```

## Usage

### Initialize the Client

```typescript
import { PayifClient } from 'payif';

const client = new PayifClient({
  apiKey: 'your-api-key-here',
});
```

### Create a Checkout Session

```typescript
import type { CheckoutSessionCreate } from 'payif';

const sessionData: CheckoutSessionCreate = {
  session: {
    order: {
      currency: 'USD',
      items: [
        {
          name: 'Product Name',
          amount: 2,
          pricePerUnit: 1000 // in dollars
        }
      ],
      deliveryAddress: {
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
        street: '123 Main St',
        zipCode: '94102'
      },
      deliveryDate: Date.now() / 1000, // in seconds!
      deliveryCarrier: 'UPS'
    },
    recipient: '0x...', // Ethereum address
    redirectUrl: 'https://your-app.com/success'
  },
};

try {
  const result = await client.createSession(sessionData);
  console.log('Checkout URL:', result.url);
} catch (error) {
  console.error('Error creating session:', error);
}
```

## API Reference

### `PayifClient`

#### Constructor Options

- `apiKey` (required): Your Payif API key
- `baseUrl` (optional): The base URL of the Payif API

#### Methods

##### `createSession(sessionData: CheckoutSessionCreate): Promise<CheckoutSessionCreateResult>`

Creates a new checkout session.

**Parameters:**
- `sessionData`: An object containing the checkout session details

**Returns:**
- A promise that resolves to an object containing the checkout `url`

## Development

To build the SDK:

```bash
bun run build
```

To watch for changes during development:

```bash
bun run dev
```

## License

MIT
