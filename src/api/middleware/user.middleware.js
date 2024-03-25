'use strict'

import { User } from '../models/user.model.js'

const checkDuplicateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      throw new Error('Username and password is required!')

    const user = await User.findOne({
      attributes: ['username'],
      where: { username: req.body.username }
    })

    if (!user) {
      next()
    } else {
      return res
        .status(404)
        .json({ message: 'User Already Exists! Login Instead' })
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

const checkUserList = async (req, res, next) => {
  const userList = await User.findAll()

  if (userList.length === 0) {
    return res.status(400).json({
      message: 'List is Empty'
    })
  } else {
    next()
  }
}

export { checkDuplicateUser, checkUserList }
