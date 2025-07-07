import { Router } from "express";
const router = Router()

import { getCards, createCard, deleteCard, likeCard, dislikeCard, } from "../controllers/cards.js";

import {celebrate, Joi }from 'celebrate'
import { validateUrl } from "../middleware/validators.js";

router.get('/', getCards);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().custom(validateUrl)
    })
  }),
createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
export { router }
