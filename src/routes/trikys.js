import { Router } from 'express'
import { body } from 'express-validator'
import {
    getTrikys,
    getTriky,
    createTriky,
    updateTriky,
    winTriky,
    deleteTriky,
} from '../controllers/trikys.js'
// import { auth } from './auth'
const router = Router()

router.get('/', getTrikys);

//crear sala triky
router.post('/', [
    body('player1',"Debe Ingresar Un ID.").notEmpty().escape().trim().isInt(),
], createTriky)

router.get('/:id', [
    body('id',"Debe Ingresar Un ID válido.").notEmpty().escape().trim().isInt(),
], getTriky)

//unir jugador2 a sala triky
router.patch('/:id', [ 
    body('player2',"Debe Ingresar Un Nombre.").notEmpty().escape().trim().isInt(),
], updateTriky)

//winner player
router.patch('/win/:id', [ 
    body('user_id',"Debe Ingresar Un ID.").notEmpty().escape().trim().isInt(),
], winTriky)

router.delete('/:id', deleteTriky)


export default router
