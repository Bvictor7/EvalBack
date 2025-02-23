import express from 'express';
import multer from 'multer';
import Skill from '../models/Skill.js';
import { storage } from '../config/cloudinary.js';
import auth, { admin } from '../middlewares/auth.js';
import util from 'util';

const router = express.Router();
const upload = multer({ storage });

// Endpoint pour uploader une image sur Cloudinary
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    // req.file.path contient l'URL de l'image sur Cloudinary
    res.status(200).json({ message: 'Image uploadée avec succès', url: req.file.path });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer toutes les compétences
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer une compétence par son ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Compétence non trouvée' });
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer une nouvelle compétence
router.post('/', async (req, res) => {
  try {
    const { title, category, level, image } = req.body;
    const newSkill = new Skill({ title, category, level, image });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour une compétence
router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) return res.status(404).json({ message: 'Compétence non trouvée' });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
