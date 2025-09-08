import mongoose from 'mongoose';

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;


    if (!MONGO_URI) {
        console.error('Error... La variable de entorno MONGO_URI.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a la base de datos MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB Atlas', error);
        process.exit(1);
    }
};