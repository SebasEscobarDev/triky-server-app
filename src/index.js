import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config as dotenv } from "dotenv"
// conectar db
import { sequelize } from './database/db.js'
//rutas
import usersRoutes from './routes/users.js'
import trikysRoutes from './routes/trikys.js'
//agregar asosiaciones db
import './models/associations.js'
//socket io
import { createServer } from "http"
import { Server } from "socket.io"
//=========================================================================================
//========================= INICIALIZACION Y CONFIGURACION ================================
const app = express()
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
dotenv()
app.set('port', process.env.APP_PORT)
app.set('port_socket', process.env.APP_PORT_SOCKET)
app.use(morgan('dev'))
app.use(cors())
// app.use( session({secret: '123456', resave: true, saveUninitialized: true}) );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//usar rutas
app.use('/api/users', usersRoutes)
app.use('/api/trikys', trikysRoutes)

//========================= /END INICIALIZACION Y CONFIGURACION ================================
//==============================================================================================


//==============================================================================================
//====================================== SOCKET ================================================
let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    io.emit('messageResponse', data);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of userss
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});


app.get('/app', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});



httpServer.listen(app.get('port_socket'));

app.listen(app.get('port'), async() => {
	console.log('Server iniciado en puerto: '+app.get('port'))
	sequelize.sync({ force:false }).then( () => {
		console.log( "DB SYNC TRUE = resetear datos cada que inicia el api" )
	}).catch(error => {
		console.log( 'se ha producido un error', error )
	})
})


export default app