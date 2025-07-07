import { Router } from 'express';
import {
  getAllUsers, getUser, createUser, updateProfile, updateAvatar, login, getCurrentUser
} from '../controllers/users.js';
import {auth} from '../middleware/auth.js'
import { checkMe } from '../controllers/auth.js';

const router = Router();

router.get('/me', auth, getCurrentUser)
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/signin', login);
router.post('/signup', createUser);




router.get('/users/me', auth, checkMe) //fica no auth ou users?

export { router };
