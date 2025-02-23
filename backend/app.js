import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import skillRoutes from './routes/skills.js';
import settingsRoutes from './routes/settings.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB connecté'))
  .catch(err => console.error('🔴 Erreur de connexion à MongoDB', err));

// Intégration des routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/settings', settingsRoutes);

// Route de base
//
app.get('/', (req, res) => res.send('Bienvenue sur l’API du portfolio 🚀'));

export default app;
