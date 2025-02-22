import express from 'express';
import Skill from '../models/Skill.js';
import auth, { admin } from '../middlewares/auth.js';

const router = express.Router();

// ... autres endpoints

// Supprimer une compétence (accessible uniquement aux admins)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Compétence non trouvée' });
    res.status(200).json({ message: 'Compétence supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
