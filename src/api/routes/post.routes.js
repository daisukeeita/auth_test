import * as express from 'express'
import { createPost } from '../controllers/post.controller.js'
import { basicAuth } from '../middleware/basicAuth.middleware.js'

const router = express.Router()

router.post('/create', basicAuth, createPost)

export { router as postRoutes }
