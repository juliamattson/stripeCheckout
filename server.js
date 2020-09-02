const express = require('express')
require('dotenv').config('.env')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();

// Endpoints
app.post('/api/checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
            {
                description: 'Ett riktigt konstverk målat av en mycket duktig konstnär!',
                price_data: {
                currency: "sek",
                product_data: {
                    name: "Fin tavla",
                },
                unit_amount: 1200,
                },
                quantity: 2,
            },
            ],
            mode: "payment",
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
        });
        res.json({ id: session.id })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

// Files can be accessed from this folder
app.use(express.static('public'))

app.listen(3000, () => console.log('Server is running on port 3000'))