import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

function CheckoutForm() {
  
  // collect data from the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("price_1PRvMhSAewgQma7feuHAUbSv");
  
  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  // main function
  const createSubscription = async () => {
    try {
      
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name,
          email,
         
        },
      });
      console.log("paymentmethod",paymentMethod);

      // call the backend to create subscription
      const response = await fetch("http://localhost:3030/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"http://localhost:3000",
          // "Authorization":"Bearer sk_test_51PA4qHSAewgQma7ffa0q6k0JNqJjbWnKiE4uHCgUxNpgM46az6ljmQ1rXtDCm9kTOTwieyELES5nhW6lMq28a74Z001eWB8go0"
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod?.paymentMethod?.id,
          name,
          email,
          priceId
        }),
      }).then((res) => res.json());
      console.log("response",response);
      // const confirmPayment = await stripe?.confirmCardPayment(
      //   response.clientSecret
      // );
    const confirmPayment = await  stripe
  .confirmCardPayment( response.clientSecret, {
    payment_method: {
     card: elements?.getElement(CardElement),
      billing_details: {
        name,
        email,
        address: {
          country: "IN",
          line1: "123 main street",
          line2: null,
          city: "pueblo",
          state: "co",
          postal_code: "55555",
      },
       
      },
    },
  })
 
console.log("confirmpaymnet ",confirmPayment);
      if (confirmPayment?.error) {
        alert(confirmPayment.error.message);
      } else {
        alert("Success! Check your email for the invoice.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <input  // this should not be a text field. maybe a radio button ro something
        placeholder="Price Id"
        type="text"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <br></br>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CardElement />
      <button onClick={createSubscription} disabled={!stripe}>
        Subscribe
      </button>
    </div>
  );
}

export default CheckoutForm;