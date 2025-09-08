import mongoose from 'mongoose';

export const connectDB = async () => {
    // Movemos la lectura de la variable de entorno AQUÍ DENTRO
    const MONGO_URI = process.env.MONGO_URI;

    // La verificación también va aquí dentro
    if (!MONGO_URI) {
        console.error('❌ Error: La variable de entorno MONGO_URI no está definida.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a la base de datos MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};