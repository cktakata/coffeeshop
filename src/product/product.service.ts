import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { HTTP_CODE } from "src/errorcodes/error";
import { Product } from "../interface/product.interface";

@Injectable()
export class ProductService {

    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<Product>
    ) {}

    public async save(productDto: Product): Promise<{status: number, response: any}> {
        const createProduct = new this.productModel(productDto);
        const product = await createProduct.save();
        console.log(product)
        return { status: HTTP_CODE.OK, response: product }
    }

    public async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}