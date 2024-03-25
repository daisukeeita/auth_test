'use strict'

import express from 'express'
import session from 'express-session'
import expressMySqlSession from 'express-mysql-session'
import mysql from 'mysql2'
import * as dotenv from 'dotenv'
import listenToPort from './src/api/controllers/port.controller.js'
import { userRoutes } from './src/api/routes/user.routes.js'
import * as db from './src/api/services/sequelize.js'
import { postRoutes } from './src/api/routes/post.routes.js'

dotenv.config()

const app = express()
// const store = new session.MemoryStore()
const mysqlStore = expressMySqlSession(session)

const options = {
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}
const sessionStore = new mysqlStore(options)

app.listen(process.env.APP_PORT, listenToPort)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    connectionLimit: 10,
    secret: process.env.SESS_SECRET,
    cookie: {
      // maxAge: 2000
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    name: process.env.SESS_NAME
  })
)

db.sequelize
  .authenticate()
  .then(async () => {
    await db.sequelize.sync()
    console.info(`DB Connected and Synced.`)
  })
  .catch((err) => {
    console.error(`DB Error: ${err}`)
  })

let view = 0

app.get('/', (req, res, next) => {
  req.session.view += 1
  res.json(req.session.view)
  next()
})

app.use('/user', userRoutes)
app.use('/post', postRoutes)
