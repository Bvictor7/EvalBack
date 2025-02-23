import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['débutant', 'intermédiaire', 'expert'], 
    required: true 
  },
  image: { type: String, required: true } // URL de l'image sur Cloudinary
}, { timestamps: true });

const Skill = mongoose.model('Skill', SkillSchema);
export default Skill;
