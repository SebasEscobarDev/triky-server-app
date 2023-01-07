import UserModel from '../Operations/User.js';
const user = new UserModel();

class User {
    
    static async login(email){
        return await user.login(email)
    }

    static async getUserLogin(req,res){
        return await user.getUserLogin(req,res)
    }

    static async getUsers() {
        return await user.getUsers()
    }

    static async getUser(id){
        return await user.getUser(id)
    }

    static async createUser(body) {
        return await user.createUser(body)
    }

    static async updateUser(id, body) {
        return await user.updateUser(id, body)
    }

    static async deleteUser(id){
        return await user.deleteUser(id)
    }
    
}

export default User;