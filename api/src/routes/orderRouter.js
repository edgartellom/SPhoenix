const { Router } = require("express");
const { Order } = require("../db");
require("dotenv").config();

const router = Router();

const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const Stripe = require("stripe");
const stripe = new Stripe(STRIPE_API_KEY);

router.get("/", async (req, res, next) => {
  try {
    const allOrders = await Order.findAll();
    res.status(200).send(allOrders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id, totalPrice } = req.body;
    const payment = await stripe.paymentIntents.create({
      totalPrice,
      currency: "USD",
      description: "product.brand product.name",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.send({ message: "Succesfull payment" });
  } catch (error) {
    next(error);
    res.json({ message: error.raw.message });
  }
});

module.exports = router;
