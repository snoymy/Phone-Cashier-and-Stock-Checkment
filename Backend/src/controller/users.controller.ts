import { Request, Response } from "express";
import { uuid } from 'uuidv4';
import { Users } from "../models/user";

class UserController{
    async create(req: Request, res: Response){
        const id = uuid();

        try{
            const record = await Users.create({ ...req.body, id});
            return res.json({ record, msg: "Successfully create user"});
        }catch (e){
            return res.json({msg: 'fail to create user', status: 500, route: '/create'})
        }
    }

    async getUser(req: Request, res: Response){
        try{
            const rows = await Users.findAll();
            return res.json(rows);
        }catch(e){
            return res.json({msg: 'fail to get user', status: 500, route: '/getUser'})
        }
    }

    async getOneUser(req: Request, res: Response){
        try{
            const rows = await Users.findOne();
            return res.json(rows);
        }catch(e){
            return res.json({msg: 'fail to get user', status: 500, route: '/getUser'})
        }
    }

    async editUser(req: Request, res: Response){
        try{
            const rows = await Users.findAll();
            return res.json(rows);
        }catch(e){
            return res.json({msg: 'fail to get user', status: 500, route: '/getUser'})
        }
    }

    async deleteUser(req: Request, res: Response){
        try{
            const rows = await Users.findAll();
            return res.json(rows);
        }catch(e){
            return res.json({msg: 'fail to get user', status: 500, route: '/getUser'})
        }
    }
}

export default new UserController();