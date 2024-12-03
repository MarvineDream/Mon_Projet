import Commentaire from '../models/commentaireModels.js';


export const createCommentaire = async (req, res) => {
    const { id_tache, id_Utilisateur, contenu_commentaire } = req.body;
    if(!id_tache || !id_Utilisateur || !contenu_commentaire) {
        return res.status(400).json
    }

    try {
        const nouveauCommentaire = new Commentaire({
            id_tache,
            id_Utilisateur,
            contenu_commentaire
        });

        await nouveauCommentaire.save();
        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.find().populate('id_tache id_Utilisateur');
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCommentaireById = async (req, res) => {
    const { id } = req.params;

    try {
        const commentaire = await Commentaire.findById(id).populate('id_tache id_Utilisateur');
        if (!commentaire) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCommentaire = async (req, res) => {
    const { id } = req.params;
    const { contenu_commentaire } = req.body;

    try {
        const commentaire = await Commentaire.findByIdAndUpdate(
            id,
            { contenu_commentaire },
            { new: true }
        );

        if (!commentaire) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCommentaire = async (req, res) => {
    const { id } = req.params;

    try {
        const commentaire = await Commentaire.findByIdAndDelete(id);
        if (!commentaire) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};