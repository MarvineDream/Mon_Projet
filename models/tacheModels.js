import mongoose from 'mongoose';


const tacheSchema = new mongoose.Schema({
    id_utilisateurs: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    nom_tache: { type: String, required: true },
    description_tache: { type: String, required: true },
    date_echeance: { type: Date, required: true },
    id_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }], 
    priorite: { type: String, enum: ['élevé', 'moyen', 'faible'], default: 'moyen' },
    tache_terminee: { type: Boolean, default: false },
    date_creationTache: { type: Date, default: Date.now }
});

const Tache = mongoose.model('Tache', tacheSchema);

export default Tache;
