const User = require('../models/user');
const bcrypt = require('bcryptjs')

module.exports.getAllUsers = (req, res) => {
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
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Usuário não encontrado com esse id');
      error.statusCode = 404;
      error.name = 'UsuarioNaoEncontrado';
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'UsuarioNaoEncontrado') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
};
module.exports.createUser = (req, res) => {
  //TODO: criar o hash de senha
  console.log(req.body)

  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)


  .then(hash => User.create({
    name,
    about,
    avatar,
    email,
    password: hash
  }))

  .then((user) => {
    console.log('entrou')
      if (!user) {
        return res.status(404).send({ message: 'Falha ao criar usuário' });
      }

      res.send({ data: user });
    })
  .catch((err) => {
    if (err.name === 'FalhaAoCriarUsuario') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Erro interno do servidor' });
  });
};


module.exports.updateProfile = (req, res) => {
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
};
module.exports.updateAvatar = (req, res) => {
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
};
