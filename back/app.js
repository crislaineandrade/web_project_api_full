import express from 'express';
import connectDatabase from './database/database.js';
import { router as userRouter } from './routes/users.js';
import { router as cardsRouter } from './routes/cards.js';
import { router as authRouter } from './routes/auth.js';
import {auth}from './middleware/auth.js'
import cors from 'cors'
import 'dotenv/config'
import { requestLogger, errorLogger } from './middleware/logger.js';
import {errorHandler} from './middleware/erroHandler.js'

const { PORT = 3001 } = process.env;


const app = express();
connectDatabase();
app.use(cors())

app.use(express.json());

app.use(requestLogger);


app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.url)
  next();
});


//ROTAS PÚBLICAS
app.use('/auth', authRouter);

app.use(auth)

// Rotas privadas
app.use('/users', userRouter);
app.use('/cards', cardsRouter);



// Rota para não encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Rota não encontrada' });
});

app.use(errorLogger);

app.use(errorHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
