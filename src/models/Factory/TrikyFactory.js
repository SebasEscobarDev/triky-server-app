import TrikyModel from '../Operations/Triky.js';
const triky = new TrikyModel();

class Triky {

    static async getTrikys() {
        return await triky.getTrikys()
    }

    static async getTriky(id){
        return await triky.getTriky(id)
    }

    static async createTriky(body) {
        return await triky.createTriky(body)
    }

    static async updateTriky(id, body) {
        return await triky.updateTriky(id, body)
    }

    static async winTriky(id, body) {
        return await triky.winTriky(id, body)
    }

    static async deleteTriky(id){
        return await triky.deleteTriky(id)
    }
    
}

export default Triky;