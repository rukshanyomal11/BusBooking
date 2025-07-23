const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const auth = require('../middleware/auth');


// Create new booking (user must be logged in)
router.post('/create', auth, async (req, res) => {
  try {
   console.log('Received booking data:', req.body);
    console.log('User ID:', req.user.userId);

    const booking = new Booking({
      userId: req.user.userId, // assign logged-in user's id
      type: req.body.type,
      date: req.body.date,
      from: req.body.from,
      to: req.body.to,
      name: req.body.name,
      number: req.body.number,
      status: req.body.status || "Waiting"
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for a specific user (protected)
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Only allow access to own bookings
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (protected)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only the owner (or admin) should be allowed to update (simple check)
    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
