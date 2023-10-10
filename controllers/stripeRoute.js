const express = require('express').router();
const router = require('../apiRoutes');
const router = express();
const stripe = require('stripe')('sk_test_51NxZSzBVsAs3ng48C78qHNSsEzS3qvrxGfiSiFyBD8ILdrPunnnppuSCKXj8qQADt9m9oAM65Rp4B75Y2HlbCGB900enyCSmTV');
router.use(express.static('public'));
router.use(express.json());

router.post('/add-to-cart', (req, res) => {
    // Add a product to the cart (you need to pass the product details)
    const product = req.body;
    cart.push(product);
    res.json({ success: true });
  });
  router.get('/cart', (req, res) => {
    // Return the cart contents
    res.json(cart);
  });
  router.post('/create-checkout-session', async (req, res) => {
    // Create a checkout session using Stripe
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      line_items: [
        {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
      ],
      mode: 'payment',
    });

    res.redirect(303, session.url);
});

module.exports = router;