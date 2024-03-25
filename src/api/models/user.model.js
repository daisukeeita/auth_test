import { Model as Model, DataTypes as DataTypes } from 'sequelize'
import * as db from '../services/sequelize.js'
import { Post } from './post.model.js'

const sequelize = db.sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.CHAR(46),
    allowNull: false,
    validate: {
      notNull: { message: 'Name is Required!' }
    }
  },
  username: {
    type: DataTypes.CHAR(46)
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: [6, 100]
    }
  }
})

User.hasMany(Post)
Post.belongsTo(User)

export { User }
