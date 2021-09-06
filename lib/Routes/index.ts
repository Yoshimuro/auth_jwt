import {Request,Response} from "express";
import {CategoryController} from "../controllers/categoryController"

export class Index {
    categoryController : CategoryController = new CategoryController()

    public routes(app):void{
        app.route("/").get(console.log('Hello world'))

        app.route("/category")
            .get(this.categoryController.index)
            .post(this.categoryController.create)
        app.route("/category/:id")
            .get(this.categoryController.show)
            .put(this.categoryController.update)
            .delete(this.categoryController.delete)





    }





}
