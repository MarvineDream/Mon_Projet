import mongoose from 'mongoose';


const collaborateursSchema = new mongoose.Schema({
    id_tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true },
    id_Utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }
});

const Collaborateur = mongoose.model('Collaborateur', collaborateursSchema);

export default Collaborateur;