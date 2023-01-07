import Triky from '../models/Factory/TrikyFactory.js'

export const getTrikys = async(req, res, next) => {
    try{
        const trikys = await Triky.getTrikys();
        return res.status(200).json(trikys);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

export const getTriky = async(req, res, next) => {
    try{
        const triky = await Triky.getTriky(req.params.id);
        return res.status(200).json(triky);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

export const createTriky = async(req, res, next) => {
    try{
        const triky = await Triky.createTriky(req.body);
        return res.status(200).json(triky);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

export const updateTriky = async(req, res, next) => {
    try{
        const triky = await Triky.updateTriky(req.params.id, req.body);
        return res.status(200).json(triky);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

export const winTriky = async(req, res, next) => {
    try{
        console.log('--------------')
        const trikyOld = await Triky.getTriky(req.params.id);
        const triky = await Triky.winTriky(req.params.id, {
            player1: trikyOld.player1,
            player2: trikyOld.player2,
            ...req.body,
        });
        return res.status(200).json(triky);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

export const deleteTriky = async(req, res, next) => {
    try{
        const triky = await Triky.deleteTriky(req.params.id);
        return res.status(200).json(triky);
    }catch( error ){
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}
