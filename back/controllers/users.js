import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import user from '../models/user.js';
import card from '../models/card.js';

export function getAllUsers(req, res) {
  User.find({})
    .orFail(() => {
      const error = new Error('Erro ao encontrar usuários');
      error.name = 'FalhaAoEncontrarUsuarios';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'FalhaAoEncontrarUsuarios') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
}
export function getUser(req, res) {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Usuário não encontrado com esse id');
      error.statusCode = 404;
      error.name = 'UsuarioNaoEncontrado';
      throw error;
    })
    .then((user) => {
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'UsuarioNaoEncontrado') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
}
export function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })

    .then((user) => {

      res.send({ data: user });
    })

    .catch((err) => {
      console.error(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Dados inválidos.' });
      }

      return res.status(500).send({ message: 'Erro interno do servidor', error: err });
    });
}

export function updateProfile(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      return res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Erro interno no servidor' }));
}
export function updateAvatar(req, res) {
  const userId = req.user._id;
  const avatar = req.body;
  User.findByIdAndUpdate(userId, avatar, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      return res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Erro interno no servidor' }));
}

export function login(req, res) {
  const { email, password } = req.body;
  console.log('Tentando login com:', email, password);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'chave-secreta', { expiresIn: '7d' });

      res.send({ token });
    })

    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

export function getCurrentUser(req, res) {
  const userId = req.user._id

  user.findById(userId)
  .orFail(() => {
    const error = new Error('Usuário não encontrado')
    error.statusCode = 404
    throw error
  })
  .then((user) => {
    res.send({data:user})
  })
  .catch((error) => {
    res.status(error.statusCode || 500).send({message: error.message})
  })

}



