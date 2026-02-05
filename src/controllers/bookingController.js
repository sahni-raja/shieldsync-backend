import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { serviceType, bookingDate, durationHours } = req.body;

    const booking = await Booking.create({
      client: req.user.id,
      serviceType,
      bookingDate,
      durationHours,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user.id })
      .populate("securityPersonnel", "name phone");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
