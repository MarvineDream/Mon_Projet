import Rappel from '../models/rappelModels.js';
import { format } from 'date-fns';


export const createRappel = async (req, res) => {
    const { id_Utilisateur, date_heureRappel, type_notification } = req.body;

    
    if (!id_Utilisateur || !date_heureRappel || !type_notification) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        
        const formattedDate = format(new Date(date_heureRappel), 'dd-MM-yyyy HH:mm:ss'); 

        const nouveauRappel = new Rappel({
            id_Utilisateur,
            date_heureRappel: formattedDate, 
            type_notification
        });

        await nouveauRappel.save();
        res.status(201).json(nouveauRappel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllRappels = async (req, res) => {
    try {
        const rappels = await Rappel.find().populate('id_Utilisateur');
        res.status(200).json(rappels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getRappelById = async (req, res) => {
    const { id } = req.params;

    try {
        const rappel = await Rappel.findById(id).populate('id_Utilisateur');
        if (!rappel) return res.status(404).json({ message: 'Rappel non trouvé' });
        res.status(200).json(rappel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateRappel = async (req, res) => {
    const { id } = req.params;
    const { date_heureRappel, type_notification } = req.body;

    try {
        const rappel = await Rappel.findByIdAndUpdate(
            id,
            { date_heureRappel, type_notification },
            { new: true }
        );

        if (!rappel) return res.status(404).json({ message: 'Rappel non trouvé' });
        res.status(200).json(rappel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteRappel = async (req, res) => {
    const { id } = req.params;

    try {
        const rappel = await Rappel.findByIdAndDelete(id);
        if (!rappel) return res.status(404).json({ message: 'Rappel non trouvé' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};