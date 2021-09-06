import {Request,Response} from "express";
import {Category,CategoryInterface} from "../models/category_model";
import {DestroyOptions,UpdateOptions} from "sequelize";

export class CategoryController{
    index(req:Request, res: Response){
        Category.findAll<Category>({})
            .then((category: Array<Category>)=> res.json(category))
            .catch((err:Error) => res.status(500).json(err))
    }
    create(req:Request, res:Response){
        const params: CategoryInterface = req.body
        Category.create<Category>(params)
            .then((category: Category) => res.status(201).json(category))
            .catch((err:Error) => res.status(500).json(err))
    }
    show (req:Request, res:Response){
        const categoryID: number = +req.params.id
        Category.findByPk<Category>(categoryID)
            .then((category:Category | null) => {
                if (category){
                    res.json(category)
                }else{
                    res.status(404).json({errors: ["Category not found"]})
                }
            })
            .catch((err: Error) => res.status(500).json(err.message))
    }
    update(req: Request, res: Response){
        const categoryID: number = +req.params.id
        const params: CategoryInterface = req.body
        const update: UpdateOptions = {
            where:{id:categoryID},
            limit:1
        };
        Category.update(params,update)
            .then(() => res.status(202).json({data: "update success"}))
            .catch((err: Error) => res.status(500).json(err))
    }
    delete(req:Request, res: Response){
        const categoryID: number = +req.params.id
        const options: DestroyOptions = {
            where: {id: categoryID},
            limit:1
        }
        Category.destroy(options)
            .then(() => res.status(202).json({data:"delete success"}))
    }
}