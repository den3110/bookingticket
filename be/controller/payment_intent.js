// import connection from "../database/init.js"
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51KuWAjDq3U6SJ6915LQX9p61105YtujKbeoQEYpPrkXyzZSngAaIcTfg7ugDRNALsNUdemyObiaXv1fODnxvGBey00DXT11WC1');

export const payment_intent= async (req, res)=> {
    try {
        const {payment_id }= req.body
        console.log(payment_id)
        const session = await stripeInstance.checkout.sessions.retrieve(payment_id);
        
        
        return res.json({ data: session });
        
    } catch (error) {
        // throw error
        // console.log(error)
        return res.status(500).json(error)
    }
}