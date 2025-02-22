import mongoose from 'mongoose';
import auth, { admin } from '../middlewares/auth.js';

const SettingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cookiePreferences: { type: Object, default: {} } // Stocke les préférences RGPD
}, { timestamps: true });

export default mongoose.model('Settings', SettingsSchema);
