import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// Récupérer les préférences d'un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.params.userId });
    if (!settings) return res.status(404).json({ message: 'Préférences non trouvées' });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour (ou créer) les préférences d'un utilisateur
router.put('/:userId', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
