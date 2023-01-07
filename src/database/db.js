import Sequelize from 'sequelize'
import { config } from '../config.js'

export const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
      host: config.host,
      dialect: 'mysql',
  }
)