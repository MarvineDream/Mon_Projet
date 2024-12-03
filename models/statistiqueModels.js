import mongoose from 'mongoose';



const statistiqueSchema = new mongoose.Schema({
    id_Utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur' 
    },
    date: {
        type: Date,
        required: true
    },
    tache_terminee: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true 
});

const Statistiques = mongoose.model('Statistiques', statistiqueSchema);

export default Statistiques;