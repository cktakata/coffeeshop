import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { HTTP_CODE } from "src/errorcodes/error";
import { Product } from "../interface/product.interface";
import * as mongoose from "mongoose";

@Injectable()
export class ProductService {

    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<Product>
    ) {}

    public async save(productDto: Product): Promise<{status: number, response: Product}> {
        const createProduct = new this.productModel(productDto);
        const product = await createProduct.save();
        return { status: HTTP_CODE.OK, response: product }
    }

    public async findAll(): Promise<{status: number, response: Product[]}> {
        const products = await this.productModel.find().exec();
        return { status: HTTP_CODE.OK, response: products }
    }

    public async get(id: string): Promise<{status: number, response: Product}> {
        const product = await this.productModel.findById(new mongoose.Types.ObjectId(id)).exec();
        return { status: HTTP_CODE.OK, response: product }
    }

    public async delete(id: string): Promise<{status: number, response: boolean}> {
        await this.productModel.deleteOne({ _id: id }).exec();
        return { status: HTTP_CODE.OK, response: true }
    }

}