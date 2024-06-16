const stripe = require("stripe")("sk_test_51PA4qHSAewgQma7ffa0q6k0JNqJjbWnKiE4uHCgUxNpgM46az6ljmQ1rXtDCm9kTOTwieyELES5nhW6lMq28a74Z001eWB8go0")


const makePayment =  async (req, res) =>{
    
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.items.map(item => {
           
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price*100,
              },
              quantity: item.quantity,
            }
          }),
          success_url:"https://fetech.colan.in/dashboard/subscription",
          cancel_url: "https://fetech.colan.in/dashboard/subscription",
        })
        res.json({ url: session.url })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
}

module.exports = {makePayment}

const createCustomer =(req,res)=>{
try {
    stripe.customers.create({
        name:req.body.name,
        email:req.body.email,
        shipping: {
            address: {
              city: 'Brothers',
              country: 'US',
              line1: '27 Fredrick Ave',
              postal_code: '97712',
              state: 'CA',
            },
            name: req.body.name,
          },
          address: {
            city: 'Brothers',
            country: 'US',
            line1: '27 Fredrick Ave',
            postal_code: '97712',
            state: 'CA',
          },
    })
} catch (error) {
    console.log(error,"customer err");
    
}
}


// const createSubscription =(req,res)=>{
//     const customerId = req.cookies['customer'];
//   const priceId = "price_1PRvMhSAewgQma7feuHAUbSv";
//     try {
//         stripe.subscriptions.create({
//             customer: customerId,
//             items: [{
//               price: priceId,
//             }],
//             payment_behavior: 'default_incomplete',
//             payment_settings: { save_default_payment_method: 'on_subscription' },
//             expand: ['latest_invoice.payment_intent'],
//           });
      
//           res.send({
//             subscriptionId: subscription.id,
//             clientSecret: subscription.latest_invoice.payment_intent.client_secret,
//           });
        
        
//     } catch (error) {
//         console.log(error,"customer err");
        
//     }
//     }

const createSubscription =async (req,res)=>{
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    payment_method: req.body.paymentMethod,
    invoice_settings: {
      default_payment_method: req.body.paymentMethod,
    },
  });


  // get the price id from the front-end
  const priceId = req.body.priceId;

  // create a stripe subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_options: {
        card: {
          request_three_d_secure: 'any',
        },
      },
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
  });
  console.log("loggg",subscription);
  // return the client secret and subscription id
  res.send ({
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id,
  })
}
    
    module.exports={createCustomer,createSubscription}