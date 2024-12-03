import Collaborateur from '../models/collaborateurModels.js';


export const createCollaborateur = async (req, res) => {
    const { id_tache, id_Utilisateur } = req.body;

    if (!id_tache || !id_Utilisateur) {
        return res.status(400).json({ message: 'id_tache et id_Utilisateur sont requis.' });
    }

    try {
        const nouveauCollaborateur = new Collaborateur({
            id_tache,
            id_Utilisateur
        });

        await nouveauCollaborateur.save();
        res.status(201).json(nouveauCollaborateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCollaborateurs = async (req, res) => {
    try {
        const collaborateurs = await Collaborateur.find().populate('id_tache id_Utilisateur');
        res.status(200).json(collaborateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCollaborateurById = async (req, res) => {
    const { id } = req.params;

    try {
        const collaborateur = await Collaborateur.findById(id).populate('id_tache id_Utilisateur');
        if (!collaborateur) return res.status(404).json({ message: 'Collaborateur non trouvé' });
        res.status(200).json(collaborateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCollaborateur = async (req, res) => {
    const { id } = req.params;
    const { id_tache, id_Utilisateur } = req.body;

    if (!id_tache && !id_Utilisateur) {
        return res.status(400).json({ message: 'Au moins un champ doit être fourni pour la mise à jour.' });
    }

    try {
        const collaborateur = await Collaborateur.findByIdAndUpdate(
            id,
            { id_tache, id_Utilisateur },
            { new: true, runValidators: true } 
        );

        if (!collaborateur) return res.status(404).json({ message: 'Collaborateur non trouvé' });
        res.status(200).json(collaborateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCollaborateur = async (req, res) => {
    const { id } = req.params;

    try {
        const collaborateur = await Collaborateur.findByIdAndDelete(id);
        if (!collaborateur) return res.status(404).json({ message: 'Collaborateur non trouvé' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
