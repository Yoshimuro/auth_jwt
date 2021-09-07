import { Request, Response } from "express";
import { Product, ProductInterface } from "../models/product_model";
import { DestroyOptions, UpdateOptions } from "sequelize";

export class ProductController {
  index(req: Request, res: Response) {
    Product.findAll<Product>({})
      .then((product: Array<Product>) => res.json(product))
      .catch((err: Error) => res.status(500).json(err));
  }
  create(req: Request, res: Response) {
    const params: ProductInterface = req.body;
    Product.create<Product>(params)
      .then((product: Product) => res.status(201).json(product))
      .catch((err: Error) => res.status(500).json(err));
  }
  show(req: Request, res: Response) {
    const productID: number = +req.params.id;
    Product.findByPk<Product>(productID)
      .then((product: Product | null) => {
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ errors: ["Product"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err.message));
  }
  update(req: Request, res: Response) {
    const productID: number = +req.params.id;
    const params: ProductInterface = req.body;
    const update: UpdateOptions = {
      where: { id: productID },
      limit: 1,
    };
    Product.update(params, update)
      .then(() => res.status(202).json({ data: "update success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
  delete(req: Request, res: Response) {
    const productID: number = +req.params.id;
    const options: DestroyOptions = {
      where: { id: productID },
      limit: 1,
    };
    Product.destroy(options).then(() =>
      res.status(202).json({ data: "delete success" })
    );
  }
}
