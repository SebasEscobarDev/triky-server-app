import TrikyModel from '../ORM/Triky.js';
import moment from 'moment'


class Triky {

    async getTrikys(){
        return await TrikyModel.findAll({
            where: { user_id: null },
            order: [
                ['id', 'ASC']
            ],
            include: [
                { association: 'winner', attributes: ['name'] },
                { association: 'p1', attributes: ['name'] },
                { association: 'p2', attributes: ['name'] },
            ],
            raw: true 
        })
    }

    async getTriky(id){
        return await TrikyModel.findOne({
            where: { id },
            include: [
                { association: 'winner', attributes: ['name'] }
            ],
            raw: true,
            returning: true
        })
    }

    async createTriky(body){
        const user_id = null
        const { player1 } = body
        const validateTriky = await TrikyModel.findOne({where:{player1, user_id}})
        if( validateTriky ){
            return { message: "no puede crear un triky porque ya tiene uno activo" }
        }
        return await TrikyModel.create({ 
                player1:            body.player1,
                created_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                updated_at:         moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                raw: true 
            }
        )
    }

    async updateTriky(id, body){
		const { player1, player2, user_id } = body;
        
        try {
            const triky = await TrikyModel.findOne({ where: { id } });
            if (triky) {
                if (player1) triky.player1 = player1;
                if (player2) triky.player2 = player2;
                if (user_id) triky.user_id = user_id; 
                triky.updated_at = moment(new Date()).utcOffset('-0500').format("YYYY-MM-DD HH:mm:ss"),
                await triky.save();
            
                return triky;
            } else {
                return { message: `No se pudo encontrar un triky con ID ${id}` };
            }
        } catch (error) {
            return { message: 'Error al actualizar el triky', error };
        }
    }


    async deleteTriky(id){
        return await TrikyModel.destroy({ 
            where: { id }
        }).catch(error => { console.log(error) });
    }
}

export default Triky;