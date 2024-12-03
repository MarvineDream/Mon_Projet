import Tache from '../models/tacheModels.js'; 


export const createTache = async (req, res) => {
    const { id_utilisateurs, nom_tache, description_tache, date_echeance, id_categories, priorite } = req.body;

    try {
        const nouvelleTache = new Tache({
            id_utilisateurs,
            nom_tache,
            description_tache,
            date_echeance,
            id_categories, 
            priorite
        });

        await nouvelleTache.save();
        res.status(201).json(nouvelleTache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getTaches = async (req, res) => {
    try {
        const taches = await Tache.find().populate('id_utilisateurs id_categories');
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getTacheById = async (req, res) => {
    const { id } = req.params;

    try {
        const tache = await Tache.findById(id).populate('id_utilisateurs id_categorie');
        if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateTache = async (req, res) => {
    const { id } = req.params;
    const { nom_tache, description_tache, date_echeance, id_categories, priorite, tache_terminee } = req.body;

    try {
        const tache = await Tache.findByIdAndUpdate(
            id,
            { nom_tache, description_tache, date_echeance, id_categories, priorite, tache_terminee },
            { new: true }
        );

        if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
        res.status(200).json(tache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteTache = async (req, res) => {
    const { id } = req.params;

    try {
        const tache = await Tache.findByIdAndDelete(id);
        if (!tache) return res.status(404).json({ message: 'Tâche non trouvée' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






