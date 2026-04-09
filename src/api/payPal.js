// src/payPal.js
import paypal from '@paypal/checkout-server-sdk';

// Configuración del entorno de pruebas (Sandbox)
const clientId = process.env.CLIENT_ID_PAYPAL;
const clientSecret = process.env.PAYPAL_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export { client };