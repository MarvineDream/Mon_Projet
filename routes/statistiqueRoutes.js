import express from 'express';
import { createStatistique, deleteStatistique, getAllStatistiques, getStatistiqueById, updateStatistique } from '../controllers/statistiqueController.js';
import { authenticateUser } from '../controllers/auth.js';



const router = express.Router();

router.post("/", createStatistique, authenticateUser),
router.get("/:id", getStatistiqueById),
router.get("/", getAllStatistiques),
router.put("/:id", updateStatistique),
router.delete("/:id", deleteStatistique)


router








export default router;