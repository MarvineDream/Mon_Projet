import express from 'express';
import { createCategorie, deleteCategorie, getAllCategories, getCategorieById, updateCategorie } from '../controllers/categorieController.js';

const router = express.Router();



router.post('/', createCategorie);
router.get('/', getAllCategories);
router.get('/:id', getCategorieById);
router.put('/:id', updateCategorie);
router.delete('/:id', deleteCategorie);



export default router;