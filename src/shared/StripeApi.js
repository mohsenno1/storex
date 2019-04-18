

// // stripe.charges.retrieve("ch_19yUec2eZvKYlo2CGWnVPdnX", {
// //     api_key: "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
// //   });
// import axios from 'axios'

// const client = axios.create({
//   baseURL: 'https://api.stripe.com',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   }
// });

// module.exports = client;

//   class StripeApi {
//     async charge(data) {
//         let res = await new Promise((resolve, reject) => {
//             stripe.charges.create({
//                 amount: data.amount,
//                 currency: "usd",
//                 source: "tok_mastercard", // obtained with Stripe.js
//                 description: "Charge for " + data.email
//               }, function(err, charge) {
//                 if(err)
//                     reject(err)
//                 else
//                     resolve(charge)
//               });
//         })
//         return res
//     }
//   }

//   const stripeApi = new StripeApi()
//   export default stripeApi

  