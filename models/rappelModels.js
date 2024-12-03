import mongoose from 'mongoose';



const rappelSchema = new mongoose.Schema({
    id_Utilisateur : { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true },
    date_heureRappel: { type: Date, required: true },
    type_notification: { type: String, enum: ['push', 'email'], required: true }
});

const rappel = mongoose.model('rappel', rappelSchema);

export default rappel;