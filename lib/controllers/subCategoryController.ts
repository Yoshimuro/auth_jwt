import {Request,Response} from "express";
import {SubCategory,SubCategoryInterface} from "../models/subcategory_model";
import {DestroyOptions,UpdateOptions} from "sequelize";

export class SubCategoryController{
    index(req:Request, res: Response){
        SubCategory.findAll<SubCategory>({})
            .then((subCategory: Array<SubCategory>)=> res.json(subCategory))
            .catch((err:Error) => res.status(500).json(err))
    }
    create(req:Request, res:Response){
        const params: SubCategoryInterface = req.body
        SubCategory.create<SubCategory>(params)
            .then((subCategory: SubCategory) => res.status(201).json(subCategory))
            .catch((err:Error) => res.status(500).json(err))
    }
    show (req:Request, res:Response){
        const subCategoryID: number = +req.params.id
        SubCategory.findByPk<SubCategory>(subCategoryID)
            .then((subCategory:SubCategory | null) => {
                if (subCategory){
                    res.json(subCategory)
                }else{
                    res.status(404).json({errors: ["SubCategory not found"]})
                }
            })
            .catch((err: Error) => res.status(500).json(err.message))
    }
    update(req: Request, res: Response){
        const subCategoryID: number = +req.params.id
        const params: SubCategoryInterface = req.body
        const update: UpdateOptions = {
            where:{id:subCategoryID},
            limit:1
        };
        SubCategory.update(params,update)
            .then(() => res.status(202).json({data: "update success"}))
            .catch((err: Error) => res.status(500).json(err))
    }
    delete(req:Request, res: Response){
        const subCategoryID: number = +req.params.id
        const options: DestroyOptions = {
            where: {id: subCategoryID},
            limit:1
        }
        SubCategory.destroy(options)
            .then(() => res.status(202).json({data:"delete success"}))
    }
}