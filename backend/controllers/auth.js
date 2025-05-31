const User = require('../models/user')

module.exports.registerUser = (req, res) => {
  const {email, password} = req.body
  console.log(email)
  User.create({name:'44tt3',
    about:'t43t43t',
    avatar:'https://unsplash.com/pt-br/fotografias/um-close-up-de-uma-planta-com-gotas-de-agua-sobre-ela-Cze6VZlPqZg',
    email,
    password})
  .then((user) => {
    return res.send({data: user})

  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send({message: 'Erro interno ao registrar usuário'})
  })
}


//*ROTA NAO FINALIZADA
module.exports.authorizeUser = (req, res) => {
  User.find({}) //encontrar pelo que para saber se esta autorizado ou nao?
  .then((user) => {
    return res.send({data: user})

  })
  .catch((err) => {
    return res.status(500).send({message: 'Erro ao encontrar usuário'})
  })

}