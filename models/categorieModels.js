import mongoose from 'mongoose';

const categorieSchema = new mongoose.Schema({
    id_utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    nom_utilisateur: { type: String, required: true },
}, { timestamps: true }); 

const Categorie = mongoose.model('Categorie', categorieSchema);

export default Categorie;
