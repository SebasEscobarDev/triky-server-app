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
    
    async updateUser(id, body){
        const hashPass = await bcrypt.hash(body.password, 12)
        return await UserModel.update({ 
                name:               body.name,
                email:              body.email,
                password:           hashPass,
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
            },
            { 
                where : { id },
                returning: true,
                raw: true
            }
        )
    }

    async deleteUser(id){
        return await UserModel.destroy({ 
            where: { id }
        }).catch(error => { console.log(error) });
    }
}

export default User;