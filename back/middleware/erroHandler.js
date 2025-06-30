export const errorHandler = (err, req, res, next) => {
  // Se o erro tem statusCode definido, retorna a mensagem definida
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Se não tem statusCode, retorna 500 para erro não previsto
  console.error(err);
  return res.status(500).send({ message: 'Erro interno do servidor' });
};