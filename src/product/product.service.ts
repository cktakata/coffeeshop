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
        try {
            const createProduct = new this.productModel(productDto);
            const product = await createProduct.save();
            return { status: HTTP_CODE.OK, response: product }
        } catch(e) {
            throw new Error(e.stack)
        }
    }

    public async findAll(): Promise<{status: number, response: Product[]}> {
        try {
            const products = await this.productModel.find().exec();
            return { status: HTTP_CODE.OK, response: products }
        } catch(e) {
            throw new Error(e.stack)
        }
    }

    public async get(id: string): Promise<{status: number, response: Product}> {
        try {
            const product = await this.productModel.findById(new mongoose.Types.ObjectId(id)).exec();
            return { status: HTTP_CODE.OK, response: product }
        } catch(e) {
            throw new Error(e.stack)
        }
    }

    public async delete(id: string): Promise<{status: number, response: boolean}> {
        try {
            await this.productModel.deleteOne( { _id: id } ).exec();
            return { status: HTTP_CODE.OK, response: true }
        } catch(e) {
            throw new Error(e.stack)
        }
    }

    public async update(id:string, productDto: Product): Promise<{status: number, response: Product}> {
        try {
            const updateProduct = await this.productModel.updateOne( { _id: new mongoose.Types.ObjectId(id) }, productDto );
            return { status: HTTP_CODE.OK, response: updateProduct as any }
        } catch(e) {
            throw new Error(e.stack)
        }
    }

}