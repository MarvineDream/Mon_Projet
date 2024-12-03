import express from 'express';
import { createCommentaire, deleteCommentaire, getAllCommentaires, getCommentaireById, updateCommentaire } from '../controllers/commentaireController.js';


const router = express.Router();

router.post("/", createCommentaire)
router.get("/:id", getCommentaireById)
router.get("/", getAllCommentaires)
router.put("/:id", updateCommentaire)
router.delete("/:id", deleteCommentaire)










export default router;