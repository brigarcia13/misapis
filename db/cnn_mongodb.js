import pkg from 'colors';
const colors = pkg;
import mongoose from 'mongoose';


let isConected = false;

const conectarAMongoDB = async () => {
  if (isConected) {
    console.log(colors.green('Ya está conectado a MongoDB'));
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConected = true;
    console.log(colors.green('Conectado a MongoDB'));
  } catch (error) {
    console.log(colors.red('Error al conectar a MongoDB:'), error);
  }
};

const db = mongoose.connection;

db.on('error', (error) => {
  isConected = false;
  console.log(colors.red('Error al conectar a MongoDB'), error);
});

db.once('open', () => {
  isConected = true;
});

db.on('disconnected', () => {
  isConected = false;
  console.log(colors.yellow('Desconectado de MongoDB'));
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log(colors.yellow('Mongo desconectado'));
  process.exit();
});

export { conectarAMongoDB, isConected };
