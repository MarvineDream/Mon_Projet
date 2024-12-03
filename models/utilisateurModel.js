import mongoose from 'mongoose';


const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    date_creationCompte: { type: Date, default: Date.now }
});

const utilisateur = mongoose.model('Utilisateur', utilisateurSchema);








export default utilisateur;

