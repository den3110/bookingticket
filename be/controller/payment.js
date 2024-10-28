// import connection from "../database/init.js"
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51KuWAjDq3U6SJ6915LQX9p61105YtujKbeoQEYpPrkXyzZSngAaIcTfg7ugDRNALsNUdemyObiaXv1fODnxvGBey00DXT11WC1');

export const payment= async (req, res)=> {
    const {total, quality }=req.body
    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Product',
              },
              unit_amount: total, // Số tiền thanh toán (đơn vị cents)
            },
            quantity: quality, // Số lượng sản phẩm
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/payment/status/success',
        cancel_url: 'http://localhost:3000/payment/status/failure',
      });
    
      res.json({ id: session.id, payment: session });
}