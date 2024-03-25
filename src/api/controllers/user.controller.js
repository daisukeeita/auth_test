'use strict'

import * as bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { Post } from '../models/post.model.js'

const createUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashPassword

    const user = await User.create(req.body)

    if (!user) {
      throw new Error('Field is Required to fill!')
    } else {
      return res.status(200).json({
        message: `User ${user.username} has been created`,
        data: {
          user
        }
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getAllUsers = async (req, res, next) => {
  console.log(`${req.sessionID}`)
  const allUsers = await User.findAll()
  return res.status(200).json(allUsers)
}

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'username'],
      include: [
        {
          model: Post,
          attributes: ['id', 'userId', 'title', 'description']
        }
      ]
    })
    if (!user) throw new Error('User does not exist!')
    return res.status(200).json({
      data: user
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      throw new Error('Username and password is required!')

    const findUser = await User.findOne({
      where: { username: req.body.username }
    })

    if (!findUser) {
      throw new Error('User Not Found! Register instead')
    }

    const matchPassword = await bcrypt.compare(
      JSON.parse(JSON.stringify(password)),
      findUser.password
    )

    if (!matchPassword) {
      throw new Error('Incorrect Password! Please try again...')
    } else {
      req.session.authenticated = true
      req.session.user = {
        name: findUser.name,
        id: findUser.id
      }
      res.status(200).send(`User ${findUser.name} has logged in!`)
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

const logoutUser = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw new Error(`Error Destroying Session: ${err}`)
      } else {
        res.send('Logged Out Successfully!')
      }
    })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export { createUser, getAllUsers, loginUser, logoutUser, getUserById }
