import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import photoRoutes from './routes/photoRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/photos', photoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
