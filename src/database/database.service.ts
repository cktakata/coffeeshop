import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Product } from "../interface/product.interface";

@Injectable()
export class DatabaseService {

  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) { }

  async healthcheck(): Promise<Product[]> {
    try {
      return this.productModel.find().exec();
    } catch(err) {
      throw new Error('Cannot connect to database')
    }
  }

}