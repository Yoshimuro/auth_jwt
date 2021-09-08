import {CategoryController} from "../controllers/categoryController"
import {SubCategoryController} from "../controllers/subCategoryController"
import {ProductController} from "../controllers/productController";
import {RequestController} from "../controllers/requestController";
import {UserController} from "../controllers/userController";
import {UserAddInterface} from "../models/users_model";
import {userRules} from "../rules/user.rules";
import {validationResult} from 'express-validator/check'
import {matchedData} from 'express-validator/filter'

export class Routes {
    categoryController : CategoryController = new CategoryController()
    subCategoryController: CategoryController = new SubCategoryController()
    productController: ProductController = new ProductController()
    requestController: RequestController = new RequestController()
    userController: UserController = new UserController()

    public routes(app):void{
        app.route("/").get('Hello')

        app.route("/category")
            .get(this.categoryController.index)
            .post(this.categoryController.create)
        app.route("/category/:id")
            .get(this.categoryController.show)
            .put(this.categoryController.update)
            .delete(this.categoryController.delete)

        app.route("/subcategory")
            .get(this.subCategoryController.index)
            .post(this.subCategoryController.create)
        app.route("/subcategory/:id")
            .get(this.subCategoryController.show)
            .put(this.subCategoryController.update)
            .delete(this.subCategoryController.delete)

        app.route("/product")
            .get(this.productController.index)
            .post(this.productController.create)
        app.route("/product/:id")
            .get(this.productController.show)
            .put(this.productController.update)
            .delete(this.productController.delete)

        app.route("/request")
            .get(this.requestController.index)
            .post(this.requestController.create)
        app.route("/request/:id")
            .get(this.requestController.show)
            .put(this.requestController.update)
            .delete(this.requestController.delete)

        app.post('/register', userRules['forRegister'], (req, res) => {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                return res.status(422).json(errors.array())
            const payload = matchedData(req) as UserAddInterface
            const user = this.userController.register(payload)

            return user.then(u => res.json(u))
          })
        app.post('/login', userRules['forLogin'], (req,res) => {
            const errors = validationResult(req)

            if(!errors.isEmpty())
                res.status(422).json(errors.array())

            const payload = matchedData(req) as UserAddInterface
            const token = this.userController.login(payload)

            return token.then(t => res.json(t))
        })
    }
}
