// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const port = 5500;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/metro_booking', {
  useNewUrlParser: true, // This line is optional, as useNewUrlParser has no effect
  useUnifiedTopology: true, // This line is optional, as useUnifiedTopology has no effect
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for metro bookings
const bookingSchema = new mongoose.Schema({
  fromStation: { type: String, required: true },
  toStation: { type: String, required: true },
  fare: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

app.use(cors());
app.use(bodyParser.json());

// Handle metro booking
app.post('/bookings', async (req, res) => {
  const { fromStation, toStation, fare } = req.body;

  try {
    const newBooking = new Booking({ fromStation, toStation, fare });
    await newBooking.save();
    res.json({ message: 'Booking successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Booking failed' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
