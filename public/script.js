let stripe;
window.addEventListener('load', main)

function main() {
   const checkoutButton = document.getElementById('checkout-button')
   checkoutButton.addEventListener('click', proceedToCheckout)

   stripe = Stripe('pk_test_51HMqSzB979vlbHgipDCCEbRksJjH513MddC8fw21FjfEy8DuJXosMnVFVTIZugCBKPgVwoy59rqRfmr2lrn0G8I100oKXpFnx8')

    verifyCheckoutSession();
}

async function proceedToCheckout() {
    try {
        const response = await fetch('/api/checkout-session', { method: 'POST'})
        const session = await response.json()

        if(response.status > 400) {
            console.error(session.error)
            return
        }

        // Proceed to open the checkout page
        const result = await stripe.redirectToCheckout({ sessionId: session.id});

        if(result.error) {
            alert(result.error.message)
        }

    } catch (error) {
        console.error(error) 
    }
}

async function verifyCheckoutSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if(sessionId) {
         // verifiera att sessionen är ok!
        console.log(sessionId);
        const response = await fetch('/api/verify-checkout-session', { 
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({ sessionId })
        })
        const session = await response.json()
        console.log(session.isVerified)
        if(session.isVerified) {
            window.location.pathname = "confirmation"
        } else {
            alert('Beställningen misslyckades')
        }
    }
}