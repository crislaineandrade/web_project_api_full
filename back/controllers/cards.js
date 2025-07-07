import Card from '../models/card.js';

export function getCards(req, res) {
   Card.find({})

    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'FalhaAoEncontrarCartoes') {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Erro interno do servidor' });
    });
}
export function createCard(req, res) {
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
}
export function deleteCard(req, res) {

  const userId = req.user._id;
  const cardId = req.params.id;


  // Primeiro busca o cartão

  Card.findById(cardId)
  .then((card) => {
    if (!card) {
      return res.status(404).send({message: 'Cartão não encontrado.'})
    }

    //Verifica se o dono bate com o usuario atual

    if (card.owner.toString() !== userId) {
      return res.status(403).send({message: 'Você não tem permissão para excluir este cartão.'})
    }

    //Exclui o cartão

    return Card.findByIdAndDelete(cardId).then((deleteCard) =>
    res.send({data: deleteCard})
  )
  })
  .catch(() => {
    res.status(500).send({message: 'Erro interno do servidor.'})
  })

}


export function likeCard(req, res) {
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
}
export function dislikeCard(req, res) {
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
}
