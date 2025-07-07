import jwt from 'jsonwebtoken';
const JWT = process.env.JWT

export const auth = (req, res, next) => {
  const {authorization} = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {

    const error = new Error('Acesso proibido: Token não encontrado.')
    error.statusCode = 403;
    return next(error);

  }

  const token = authorization.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token, JWT)
    req.user = payload
    next()

  } catch (err) {
    const error = new Error('Acesso proibido: Token inválido.')
    err.statusCode = 403
    return res.status(403).send({message: 'Acesso proibido: Token inválido.' })
    next(error)
  }
}

