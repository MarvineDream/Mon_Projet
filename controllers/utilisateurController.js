import Utilisateur from '../models/utilisateurModel.js';
import User from '../models/userModel.js'; // Renommé pour éviter la confusion
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Récupérer tous les utilisateurs
export const getUtilisateurs = async (req, res) => {
    try {
        const results = await Utilisateur.find(); 
        res.json(results);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
    const { nom, email, password } = req.body; 

    if (!nom || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        const saltRounds = 10; 
        const password_hash = await bcrypt.hash(password, saltRounds);

        const nouvelUtilisateur = new Utilisateur({
            nom,
            email,
            password_hash,
        });
        
        const utilisateurSauvegarde = await nouvelUtilisateur.save();
        
        res.status(201).json({ utilisateur: utilisateurSauvegarde });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'L\'email est déjà utilisé.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par ID
export const getUtilisateurById = async (req, res) => {
    const id = req.params.id; 

    try {
        const utilisateur = await Utilisateur.findById(id);
        
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json(utilisateur);
    } catch (err) {
        return res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
};

// Mettre à jour un utilisateur
export const updateUtilisateurs = async (req, res) => {
    const id = req.params.id; 
    const updatedData = req.body; 

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, updatedData, {
            new: true, 
            runValidators: true 
        });
        
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json({ message: 'Utilisateur mis à jour avec succès', utilisateur });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
};

// Supprimer un utilisateur
export const deleteUtilisateurs = async (req, res) => {
    const id = req.params.id; 

    try {
        const utilisateur = await Utilisateur.findByIdAndDelete(id);
        
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
};

// Enregistrer un nouvel utilisateur
export const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assurez-vous que createPoolCluster est défini ailleurs
    createPoolCluster(username, hashedPassword); 
    res.status(201).send('Utilisateur créé');
};

// Connexion d'un utilisateur
export const login = async (req, res) => {
    const { username, password } = req.body; // Corrigé de req.boby à req.body
    const user = await findUserByUsername(username); // Assurez-vous que cette fonction est définie

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Identifiants invalides');
    }

    const token = jwt.sign({
        username: user.username 
    }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Corrigé de expireIn à expiresIn

    res.json({ token });
};

// Authentifier un utilisateur
export const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ success: false, message: 'Accès refusé.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token invalide.' });
    }
};
