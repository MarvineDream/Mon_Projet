import express from 'express';
import { createTache, deleteTache, getTacheById, getTaches, updateTache, } from '../controllers/tacheController.js';
import { getTachesByCategorie } from '../controllers/categorieController.js';

const router = express.Router();

router.post('/', createTache);
router.get('/', getTaches);
router.get("/:id", getTacheById);
router.get('/categorie/:categorieId', getTachesByCategorie);
router.delete('/:id', deleteTache);
router.put("/:id", updateTache);

export default router;
