import * as express from 'express'
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser
} from '../controllers/user.controller.js'
import {
  checkDuplicateUser,
  checkUserList
} from '../middleware/user.middleware.js'
import { basicAuth } from '../middleware/basicAuth.middleware.js'

const router = express.Router()

router.post('/create', checkDuplicateUser, createUser)
router.post('/login', loginUser)
router.post('/logout', basicAuth, logoutUser)
router.get('/getAllUsers', basicAuth, checkUserList, getAllUsers)
router.get('/getUserById/:id', getUserById)

export { router as userRoutes }
