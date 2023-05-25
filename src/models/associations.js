import User from './ORM/User.js'
import Triky from './ORM/Triky.js'

Triky.belongsTo(User,    { as:'winner',   foreignKey: 'user_id' })
Triky.belongsTo(User,    { as:'p1',   foreignKey: 'player1' })
Triky.belongsTo(User,    { as:'p2',   foreignKey: 'player2' })
User.hasMany(Triky,      { as:'won',      foreignKey: 'user_id' })