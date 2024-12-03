import express from 'express';
import { createCollaborateur, deleteCollaborateur, getCollaborateurById, getCollaborateurs, updateCollaborateur } from '../controllers/collaborateurController.js';

const router = express.Router();

router.post('/', createCollaborateur);
router.get('/', getCollaborateurs);
router.get('/:id', getCollaborateurById);
router.put('/:id', updateCollaborateur);
router.delete('/:id', deleteCollaborateur);









export default router;