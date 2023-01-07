import TrikyModel from '../ORM/Triky.js';
import moment from 'moment'


class Triky {

    async getTrikys(){
        return await TrikyModel.findAll({
            order: [
                ['id', 'ASC']
            ],
            raw: true 
        })
    }

    async getTriky(id){
        return await TrikyModel.findOne({
            where: { id },
            raw: true 
        })
    }

    async createTriky(body){
		if( body.player2 == '' || body.player2 == undefined ) body.player2 = null
        return await TrikyModel.create({ 
                player1:            body.player1,
                player2:            body.player2,
                created_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                raw: true 
            }
        )
    }

    async updateTriky(id, body){
		if( body.player2 == '' || body.player2 == undefined ) body.player2 = null
        return await TrikyModel.update({ 
                player2:            body.player2,
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
            },
            { 
                where : { id },
                returning: true,
                raw: true
            }
        )
    }

    async winTriky(id, body){
        return await TrikyModel.update({ 
                player2:            body.player2,
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                user_id:            body.user_id,
            },
            { 
                where : { id },
                include: { association: 'winner' , attributes: ['name'] },
                returning: true,
                raw: true
            }
        )
    }


    async deleteTriky(id){
        return await TrikyModel.destroy({ 
            where: { id }
        }).catch(error => { console.log(error) });
    }
}

export default Triky;