import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './checkoutform';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PA4qHSAewgQma7fPw5zsBvPfTifE31ZXI3PNbYAVoRRRYWjoCusQgINEhzg6jFYwBa2R4HwXqL4TyUaeWGDmjZw00z3nOC1iE');

export default function Checkout() {
    
  return (
    <Elements stripe={stripePromise}  >
      <CheckoutForm />
 </Elements>
  );
};