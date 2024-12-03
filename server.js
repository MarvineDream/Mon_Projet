import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import tacheRoutes from './routes/tacheRoutes.js';
import collaborateurRoutes from './routes/collaborateurRoutes.js';
import commentaireRoutes from './routes/commentaireRoutes.js';
import statistiqueRoutes from './routes/statistiqueRoutes.js';
import rappelRoutes from './routes/rappelRoutes.js';
import attribuerRoutes from './routes/attribuerRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import authenticateUser from './routes/statistiqueRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { login, register } from './controllers/utilisateurController.js';


const app = express()
const users = [];
dotenv.config();
connectDB();
dotenv.config();
const PORT = 3003;

// Middleware pour permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet l'accès depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    // Gérer les requêtes OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); 
    }
  
    next(); 
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/utilisateurs', utilisateurRoutes);

app.use('/taches', tacheRoutes);

app.use('/collaborateurs', collaborateurRoutes);

app.use('/commentaires', commentaireRoutes);

app.use('/rappels', rappelRoutes);

app.use('/statistiques', statistiqueRoutes);

app.use('/attribuer', attribuerRoutes);

app.use('/Categorie', categorieRoutes);

app.use('/authenticateUser', statistiqueRoutes);

app.use('/login', login);

app.use('/register', register);



app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});