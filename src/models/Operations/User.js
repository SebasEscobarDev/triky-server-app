import UserModel from '../ORM/User.js';
import moment from 'moment'
import { literal, cast, col } from 'sequelize'
import bcrypt from 'bcryptjs'


class User {

    async login(email){
        return await UserModel.findOne({
            where: { email },
            raw: true
        })
    }

    async getUserLogin(req,res) {
        
    }

    async getUsers(){
        return await UserModel.findAll({
            order: [
                ['id', 'ASC']
            ],
            raw: true 
        })
    }

    async getUser(id){
        return await UserModel.findOne({
            where: { id },
            raw: true 
        })
    }

    async createUser(body){
        const hashPass = await bcrypt.hash(body.password, 12)
        return await UserModel.create({ 
                name:               body.name,
                email:              body.email,
                password:           hashPass,
                created_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                raw: true 
            }
        )
    }
    
    // async updateUser(id, body){
        
    //     return await UserModel.update({ 
    //             name:               body.name,
    //             email:              body.email,
    //             password:           hashPass,
    //             updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
    //         },
    //         { 
    //             where : { id },
    //             returning: true,
    //             raw: true
    //         }
    //     )
    // }

    async updateUser(id, body){
        const { name, email, password, connected } = body;
        
        try {
            const user = await UserModel.findOne({ where: { id } });
            if (user) { // Si el user existe, actualizar los campos proporcionados en el cuerpo de la solicitud
                if (name) user.name = name;
                if (email) user.email = email;
                if (password){
                    const hashPass = await bcrypt.hash(password, 12)
                    user.password = hashPass;
                }
                if (connected) user.connected = connected;
                
                user.updated_at = moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                await user.save(); // Guardar los cambios en la base de datos
            
                return user; // Devolver una respuesta con los datos del usuario actualizado
            } else {
                return { message: `No se pudo encontrar un usuario con ID ${id}` };
            }
        } catch (error) {
            console.log(error);
            return { message: 'Error al actualizar el usuario' };
        }
    }

    async deleteUser(id){
        return await UserModel.destroy({ 
            where: { id }
        }).catch(error => { console.log(error) });
    }
}

export default User;