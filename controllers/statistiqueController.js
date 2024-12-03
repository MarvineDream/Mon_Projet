import Statistiques from '../models/statistiqueModels.js';
import { isValid, parseISO } from 'date-fns';


export const createStatistique = async (req, res) => {
    const { id_Utilisateur, date, tache_terminee } = req.body;

    
    if (!id_Utilisateur || !date || tache_terminee === undefined) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
    }

   
    const parsedDate = parseISO(date);
    if (!isValid(parsedDate)) {
        return res.status(400).json({ success: false, message: 'La date fournie est invalide.' });
    }

    try {
        const nouvelleStatistique = new Statistiques({
            id_Utilisateur,
            date: parsedDate,
            tache_terminee
        });

        await nouvelleStatistique.save();
        res.status(201).json({ success: true, data: nouvelleStatistique });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ success: false, message: 'Erreur lors de la création de la statistique.', error: error.message });
    }
};

export const getAllStatistiques = async (req, res) => {
    try {
        const statistiques = await Statistiques.find().populate('id_Utilisateur');
        res.status(200).json({ success: true, data: statistiques });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getStatistiqueById = async (req, res) => {
    const { id } = req.params;

    try {
        const statistique = await Statistiques.findById(id).populate('id_Utilisateur');
        if (!statistique) return res.status(404).json({ success: false, message: 'Statistique non trouvée' });
        res.status(200).json({ success: true, data: statistique });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateStatistique = async (req, res) => {
    const { id } = req.params;
    const { tache_terminee } = req.body;

    
    if (tache_terminee === undefined) {
        return res.status(400).json({ success: false, message: 'Le champ tache_terminee est requis.' });
    }

    try {
        const statistique = await Statistiques.findByIdAndUpdate(
            id,
            { tache_terminee },
            { new: true }
        );

        if (!statistique) return res.status(404).json({ success: false, message: 'Statistique non trouvée' });
        res.status(200).json({ success: true, data: statistique });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteStatistique = async (req, res) => {
    const { id } = req.params;

    try {
        const statistique = await Statistiques.findByIdAndDelete(id);
        if (!statistique) return res.status(404).json({ success: false, message: 'Statistique non trouvée' });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};