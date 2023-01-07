import { Router } from 'express'
import { body } from 'express-validator'
import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    getUserLogin
} from '../controllers/users.js'
// import { auth } from './auth'
const router = Router()

router.get('/', getUsers);

router.post('/', [
    body('name',"Debe Ingresar Un Nombre.").notEmpty().escape().trim().isLength({ min: 3 }),
    body('email',"Debe Ingresar Un Email.").notEmpty().escape().trim().isLength({ min: 3 }),
    body('password',"La contraseña debe tener un mínimo de 4 carácteres.")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
], createUser)

router.get('/:id', [
    body('id',"Debe Ingresar Un ID válido.").notEmpty().escape().trim().isInt(),
], getUser)

router.patch('/:id', [ 
    body('name',"Debe Ingresar Un Nombre.").notEmpty().escape().trim().isLength({ min: 3 }),
    body('email',"Debe Ingresar Un Número.").notEmpty().escape().trim().isLength({ min: 3 }),
    body('password',"La contraseña debe tener un mínimo de 4 carácteres.")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
], updateUser)

router.delete('/:id', deleteUser)


//LOGIN
router.post('/login',[
    body('email',"Invalid Email Number")
        .notEmpty()
        .trim(),
    body('password',"The Password must be of minimum 4 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
], login);

//GET USER LOGIN WITH TOKEN
router.get('/get/login', getUserLogin);

export default router
