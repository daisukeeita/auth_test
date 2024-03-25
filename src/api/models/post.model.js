import { Model as Model, DataTypes as DataTypes, CHAR } from 'sequelize'
import * as db from '../services/sequelize.js'

const sequelize = db.sequelize

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.CHAR() },
  description: { type: DataTypes.CHAR() }
})

export { Post }
