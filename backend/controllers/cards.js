const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('Erro ao encontrar cartões');
      error.name = 'FalhaAoEncontrarCartoes';
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'FalhaAoEncontrarCartoes') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Erro ao criar cartão' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'FalhaAoCriarCartao') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Erro ao deletar cartão' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Erro interno do servidor' }));
};
module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Erro ao curtir cartão' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Erro interno do servidor' }));
};
module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Erro aos descurtir usuário' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Erro interno do servidor' }));
};
