import cron from 'node-cron';
import sendDailyWeather from './bot.mjs';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Schedule the function to send daily updates at a specific time (e.g., 8 AM)
const app = express();
const port = process.env.PORT || 8999;

// mongoose.connect(process.env.MONGO_PORT, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// server.js



// app.post('/users', async (req, res) => {
//   try {
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

cron.schedule('* * * * *', () => {
  sendDailyWeather();
});
