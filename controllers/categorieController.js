import Categorie from '../models/categorieModels.js';
import utilisateur from '../models/utilisateurModel.js';


export const createCategorie = async (req, res) => {
    const { id_utilisateur, nom_utilisateur } = req.body;

    try {
        const User = await utilisateur.findById(id_utilisateur);
        if (!utilisateur) {
            return res.status(400).json({ message: "Utilisateur non trouvé"})
        }

        const nouvelleCategorie = new Categorie({
            id_utilisateur,
            nom_utilisateur
        });

        await nouvelleCategorie.save();
        res.status(201).json(nouvelleCategorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find().populate('id_utilisateur');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCategorieById = async (req, res) => {
    const { id } = req.params;

    try {
        const categorie = await Categorie.findById(id).populate('id_utilisateur');
        if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCategorie = async (req, res) => {
    const { id } = req.params;
    const { id_utilisateur, nom_utilisateur } = req.body;

    try {
        const categorie = await Categorie.findByIdAndUpdate(
            id,
            { id_utilisateur, nom_utilisateur },
            { new: true }
        );

        if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(200).json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCategorie = async (req, res) => {
    const { id } = req.params;

    try {
        const categorie = await Categorie.findByIdAndDelete(id);
        if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getTachesByCategorie = async (req, res)=> {
    const { categorieId } = req.params;

    try {
        const taches = await Tache.find({
            categorie: categorieId }).populate('categorie');
            res.status(200).json({ taches });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};