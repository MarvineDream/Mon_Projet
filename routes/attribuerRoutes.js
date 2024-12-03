import express from 'express';
import { createAttribuer, deleteAttribuer, getAttribuerById, getAttributions, updateAttribuer } from '../controllers/attribuerController.js';

const router = express.Router();

router.post('/', createAttribuer);
router.get('/', getAttributions);
router.get('/:id', getAttribuerById);
router.put('/:id', updateAttribuer);
router.delete('/:id', deleteAttribuer);






export default router;