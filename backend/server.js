
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const hazards = require('./routes/hazards');
const auth = require('./routes/auth');
const uploads = require('./routes/uploads');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// File uploading
app.use(fileupload());

// Mount routers
app.use('/api/v1/hazards', hazards);
app.use('/api/v1/auth', auth);
app.use('/api/v1/hazards', uploads);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
