## Installation

### Package manager

Using npm:

```bash
npm install customer-support-sdk
```

Once the package is installed, you can import the library using `import` or `require` approach, **only default export is available**.

Using `import`:

```js
import CustomerSupportSDK from "customer-support-sdk";
```

Using `require`:

```js
const CustomerSupportSDK = require("customer-support-sdk");
```

### CDN

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/RingoverCustomerSupport/livechat-sdk/sdk.min.js"></script>
```

## Usage

```js
// Initialise sdk
// Pass Chatbot ID in the constructor
const sdk = new CustomerSupportSDK("<Chatbot ID>");

// Set user data, if available
sdk.setUserData({
  user_data: {
    "<Field name>": "<value>",
  },
  meta_data: {
    "<Meta field name>": "<value>",
  },
});
```

## Example

```js
import CustomerSupportSDK from "customer-support-sdk";

const sdk = new CustomerSupportSDK("6jbeB1DMtw2d");

// Set user data, if available
sdk.setUserData({
  user_data: {
    "First name": "Michael",
    "Last name": "Flick",
    Email: "michaelflick@example.com",
    Phone: "7575818183",
  },
  meta_data: {
    "User ID": "453990646344",
  },
});
```
