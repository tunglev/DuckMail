import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import routes from './routes';

// Initialize express app
const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with proper SSL options
mongoose.connect(config.mongodbUri, {
	// Set to true to allow connecting to Atlas
	tlsAllowInvalidCertificates: true 
})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => {
		console.error('Could not connect to MongoDB', err);
		console.log('Make sure you have whitelisted your IP address in MongoDB Atlas Network Access settings');
	});

// Routes
app.use('/api', routes);

// Basic route
app.get('/', (req, res) => {
	res.send('DuckMail API is running');
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

export default app;
