import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from "bcryptjs";
const JWT = process.env.JWT

export function registerUser(req, res) {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  User.create({
    name: 'User Teste',
    about: 'Developer',
    avatar: 'https://unsplash.com/pt-br/fotografias/um-close-up-de-uma-planta-com-gotas-de-agua-sobre-ela-Cze6VZlPqZg',
    email,
    password:hash
  })
    .then((user) => {
      return res.send({ data: user })

    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: 'Erro interno ao registrar usuário' })
    })
}



export function authorizeUser(req, res) {
  const {email, password} = req.body
    return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user)
      console.log('logando')
      // const token = jwt.sign({_id: user._id}, process.env.JWT, {expiresIn: '7d'})

      return jwt.sign({_id: user._id}, process.env.JWT, {expiresIn: '7d'})





    })

    .then((token) => {
      return res.send({token})



    })

    .catch((err) => {
      console.log(err)
      res.status(401).send({message: 'meu texto'})
    })
}
export function checkMe(req, res) {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error('Erro ao buscar usuário no checkMe:', err);
      res.status(err.statusCode || 500).send({ message: err.message });
    });



  // const {authorization} = req.headers
  //   console.log(`aqui esta o ${authorization}`)
  //   if (!authorization || !authorization.startsWith('Bearer ')) {
  //     const error = new Error('Acesso proibido: Token não encontrado.')
  //     error.statusCode = 403;
  //     throw error
  //   }
  //   const token = authorization.replace('Bearer ', '')
  //   try {
  //     const payload = jwt.verify(token, JWT)
  //     req.user = payload
  //     return res.json(payload)
  //   } catch (err) {
  //     const error = new Error('Acesso proibido: Token inválido.')
  //     err.statusCode = 403
  //     return res.status(403).send({message: 'Acesso proibido: Token inválido.' })
  //   }
}