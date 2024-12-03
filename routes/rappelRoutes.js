import express from 'express';
import { createRappel, deleteRappel, getAllRappels, getRappelById, updateRappel } from '../controllers/rappelController.js';



const router = express.Router();

router.post("/", createRappel),
router.get("/", getAllRappels),
router.get("/:id", getRappelById),
router.put("/:id", updateRappel),
router.delete("/:id", deleteRappel)










export default router;