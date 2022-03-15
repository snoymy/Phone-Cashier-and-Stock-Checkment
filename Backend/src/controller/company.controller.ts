import { Request, Response } from "express"
import { Company } from "../models/company";
import { uuid } from 'uuidv4';

class CompanyController{
    async addList(req: Request, res: Response){
        const id = uuid();

        try{
            const record = await Company.create({ ...req.body, id});
            return res.json({ record, msg: "Successfully create Company"});
        }catch (e){
            return res.json({msg: 'fail to create Company', status: 500, route: '/create'})
        }
    }

    async getList(req: Request, res: Response){
        try{
            const rows = await Company.findAll();
            return res.send(rows);
        }catch(e){
            return res.json({msg: 'fail to get Company', status: 500, route: '/getUser'})
        }
    }

    async getOne(req: Request, res: Response){
        try{
            let title_req = req.body.title;
            
            const rows = await Company.findOne({
                where:{
                    title: title_req
                }
            });

            if(!rows){
                return res.status(404).send({message: `Not found ${title_req} in Database`});
            }

            return res.send(rows);
        }catch(e){
            return res.json({msg: 'fail to get Company', status: 500, route: '/getUser'})
        }
    }

    async editList(req: Request, res: Response){
        let req_id = req.params.id;
        try{

            const update_tartget = await Company.findByPk(req_id);

            if(!update_tartget){
                return res.status(404).send({message: `Not found item to update`});
            }

            if(req.body.barcode){
                Company.update({
                        quantity: req.body.quantity
                    },
                    {where: {id: req_id}
                });
            }else{
                return res.status(401).send({message: `barcode should not be null`});
            }
            
            return res.status(200).send({
                message: `Updated successfully.`,
            });
        }catch(e){
            return res.json({msg: 'fail to get Company', status: 500, route: '/getUser'})
        }
    }

    async deleteList(req: Request, res: Response){
        let req_id = req.params.id;
        try{

            const delete_target = await Company.findByPk(req_id);

            if(!delete_target){
                return res.status(404).send({message: `Not found item to delete`});
            }

            Company.destroy(
                {where: {id: req_id}
            });
            
            return res.status(200).send({
                message: `Delete successfully.`,
            });
        }catch(e){
            return res.json({msg: 'fail to get Company', status: 500, route: '/getUser'})
        }
    }
}

export default new CompanyController();