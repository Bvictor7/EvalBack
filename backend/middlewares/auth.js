import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Récupère le token depuis le cookie ou le header Authorization (format "Bearer <token>")
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant.' });
  }
  try {
    // Vérifie le token et récupère les informations de l'utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Accès interdit: privilèges administrateur requis.' });
  }
};

export default auth;
