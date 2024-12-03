import express from "express";
import { getUtilisateurs, updateUtilisateurs, deleteUtilisateurs, getUtilisateurById, createUtilisateur } from '../controllers/utilisateurController.js';

const router = express.Router();

router.post('/', createUtilisateur);           
router.get('/', getUtilisateurs);              
router.get('/:id', getUtilisateurById); 
router.put('/:id', updateUtilisateurs);         
router.delete('/:id', deleteUtilisateurs);       

export default router;

