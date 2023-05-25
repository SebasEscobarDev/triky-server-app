import { Router } from 'express'
import { body } from 'express-validator'
import {
    getTrikys,
    getTriky,
    createTriky,
    updateTriky,
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
router.patch('/:id', updateTriky)

router.delete('/:id', deleteTriky)


export default router
