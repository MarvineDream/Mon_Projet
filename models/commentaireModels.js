import mongoose from 'mongoose';


const commentaireSchema = new mongoose.Schema({
    id_tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true },
    id_Utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    contenu_commentaire: { type: String, required: true },
    date_creationCommentaire: { type: Date, default: Date.now }
});

const Commentaire = mongoose.model('Commentaire', commentaireSchema);


export default Commentaire;