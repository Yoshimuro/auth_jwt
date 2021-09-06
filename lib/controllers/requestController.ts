import {Request,Response} from "express";
import {Requests,RequestsInterface} from "../models/request_model";
import {DestroyOptions,UpdateOptions} from "sequelize";

export class RequestController{
    index(req:Request, res: Response){
        Requests.findAll<Requests>({})
            .then((product: Array<Requests>)=> res.json(product))
            .catch((err:Error) => res.status(500).json(err))
    }
    create(req:Request, res:Response){
        const params: RequestsInterface = req.body
        Requests.create<Requests>(params)
            .then((requests: Requests) => res.status(201).json(requests))
            .catch((err:Error) => res.status(500).json(err))
    }
    show (req:Request, res:Response){
        const productID: number = +req.params.id
        Requests.findByPk<Requests>(productID)
            .then((requests:Requests | null) => {
                if (requests){
                    res.json(requests)
                }else{
                    res.status(404).json({errors: ["Request is not found"]})
                }
            })
            .catch((err: Error) => res.status(500).json(err.message))
    }
    update(req: Request, res: Response){
        const requestID: number = +req.params.id
        const params: RequestsInterface = req.body
        const update: UpdateOptions = {
            where:{id:requestID},
            limit:1
        };
        Requests.update(params,update)
            .then(() => res.status(202).json({data: "update success"}))
            .catch((err: Error) => res.status(500).json(err))
    }
    delete(req:Request, res: Response){
        const requestID: number = +req.params.id
        const options: DestroyOptions = {
            where: {id: requestID},
            limit:1
        }
        Requests.destroy(options)
            .then(() => res.status(202).json({data:"delete success"}))
    }
}