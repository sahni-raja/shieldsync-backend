import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { planName, duration, price, expiryDate } = req.body;

    const subscription = await Subscription.create({
      user: req.user.id,
      planName,
      duration,
      price,
      expiryDate,
    });

    res.status(201).json({
      message: "Subscription activated",
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
