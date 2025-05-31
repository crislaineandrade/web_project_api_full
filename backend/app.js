const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/aroundb');



const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6810c851d42756591aa2f340',
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', require('./routes/auth'))
// app.use('/', require('./routes/auth')) => aqui como ele sabe quando estou usando o registerUser e authorizeUser???

const { PORT = 3000 } = process.env;
// app.use('/', (req, res) => {
//   res.status(404).send({ message: 'Rota não encontrada' });
// });

app.use((req, res) => {
  res.status(404).send({ message: 'Rota não encontrada' });
});


app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`)
});
