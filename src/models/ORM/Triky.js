import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../database/db.js'

class Triky extends Model {}
Triky.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  player2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: DataTypes.STRING,
  updated_at: DataTypes.STRING
}, { 
  sequelize,
  modelName: 'Triky',
  tableName: 'Trikys',
  timestamps: false,
  underscored: true
});

export default Triky