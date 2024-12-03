import mongoose from 'mongoose';

const attribuerSchema = new mongoose.Schema({
    id_tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true },
    id_collaborateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator', required: true }
}, { 
    timestamps: true 
});

attribuerSchema.index({ id_tache: 1, id_collaborateur: 1 }, { unique: true });

const Attribuer = mongoose.model('Attribuer', attribuerSchema);

export default Attribuer;