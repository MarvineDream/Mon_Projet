import Attribuer from '../models/attribuerModels.js';


const validateAttributionParams = (params) => {
    const { id_tache, id_collaborateur } = params;
    if (!id_tache || !id_collaborateur) {
        return 'id_tache et id_collaborateur sont requis.';
    }
    return null;
};


export const createAttribuer = async (req, res) => {
    const validationError = validateAttributionParams(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const nouvelleAttribution = new Attribuer(req.body);
        await nouvelleAttribution.save();
        res.status(201).json(nouvelleAttribution);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Cette attribution existe déjà.' });
        }
        res.status(500).json({ message: error.message });
    }
};


export const getAttributions = async (req, res) => {
    try {
        const attributions = await Attribuer.find().populate('id_tache id_collaborateur');
        res.status(200).json(attributions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAttribuerById = async (req, res) => {
    const { id } = req.params;

    try {
        const attribution = await Attribuer.findById(id).populate('id_tache id_collaborateur');
        if (!attribution) return res.status(404).json({ message: 'Attribution non trouvée' });
        res.status(200).json(attribution);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAttribuer = async (req, res) => {
    const { id } = req.params;
    const validationError = validateAttributionParams(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const attribution = await Attribuer.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!attribution) return res.status(404).json({ message: 'Attribution non trouvée' });
        res.status(200).json(attribution);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteAttribuer = async (req, res) => {
    const { id } = req.params;

    try {
        const attribution = await Attribuer.findByIdAndDelete(id);
        if (!attribution) return res.status(404).json({ message: 'Attribution non trouvée' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
