const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,        // "One way" | "Round trip"
  date: String,        // e.g. "Sat, Jun 7"
  from: String,
  to: String,     // User's phone number
  name: String,    // User's name
  number: String,   // User's phone number
  status: { type: String, default: "Waiting" } // "Waiting" | "Accepted" | "Deleted"
});

module.exports = mongoose.model('Booking', bookingSchema);
