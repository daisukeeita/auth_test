'use strict'

import { Post } from '../models/post.model.js'

const createPost = async (req, res, next) => {
  try {
    req.body.UserId = req.session.user.id
    const post = await Post.create(req.body)
    res.status(200).json({
      data: post
    })
  } catch (error) {}
}

export { createPost }
