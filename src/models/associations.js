import User from './ORM/User.js'
import Triky from './ORM/Triky.js'

Triky.belongsTo(User,    { as:'winner',   foreignKey: 'user_id' })
User.hasMany(Triky,      { as:'won',      foreignKey: 'user_id' })