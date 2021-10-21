import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Product } from "../interface/product.interface";
import { Message } from '../util/message';

@Injectable()
export class DatabaseService {

  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) { }

  async healthcheck(): Promise<Product[]> {
      return this.productModel.find().exec();
  }

}