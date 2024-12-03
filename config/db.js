import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ndongabouroupavymarwin:universitees123@marvinecluster.yz2jy.mongodb.net/soutenanceDB', {
            ssl: true, 
        });
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error.message);
        process.exit(1); 
    }
};

export default connectDB;





