import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from 'mongoose';
import { Product } from '../interface/product.interface';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';
import { ProductService } from './product.service';

const mockProduct = {id:1, name: 'Donut', price: 1, tax: 1}

class mockProductService {
  async save() { return {status: 200, response: mockProduct} }
  async findAll() { return {status: 200, response: [mockProduct]} }
  async get(id: string) { return {status: 200, response: mockProduct} }
  async delete(id: string) { return {status: 200, response: mockProduct} }
  async update(id: string, body: Product) { return {status: 200, response: mockProduct} }
}

describe('ProductController', () => {
  let productController: ProductController;
  let mongoServer;

  beforeEach(async () => {
    // given
    mongoServer = await MongoMemoryServer.create();
    const URI = await mongoServer.getUri();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
        providers: [
          ProductService,
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: (): Promise<typeof mongoose> => mongoose.connect(URI), 
        },
        ...productProviders,
        ]})
    .compile();
    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it(`should return ${mockProduct}`, async () => {
      // given
      const mockRes = {
        status: () => {
          return {
            json: () => { return mockProduct}
          }
        }
      }
      // when
      const data = await productController.saveProduct(mockRes as any, {} as any, {} as any);
      // then
      expect(data).toBe(mockProduct);
    });
    it(`should return ${[mockProduct]}`, async () => {
      // given
      const mockRes = {
        status: () => {
          return {
            json: () => { return [mockProduct]}
          }
        }
      }
      // when
      const data = await productController.listProducts(mockRes as any, {} as any);
      // then
      expect(data).toStrictEqual([mockProduct]);
    });
    it(`should return ${mockProduct}`, async () => {
      // given
      const mockRes = {
        status: () => {
          return {
            json: () => { return mockProduct}
          }
        }
      }
      // when
      const data = await productController.getProduct(mockRes as any, {} as any, {} as any);
      // then
      expect(data).toStrictEqual(mockProduct);
    });
    it(`should return ${mockProduct}`, async () => {
      // given
      const mockRes = {
        status: () => {
          return {
            json: () => { return mockProduct}
          }
        }
      }
      // when
      const data = await productController.deleteProduct(mockRes as any, {} as any, {} as any);
      // then
      expect(data).toStrictEqual(mockProduct);
    });
    it(`should return ${mockProduct}`, async () => {
      // given
      const mockRes = {
        status: () => {
          return {
            json: () => { return mockProduct}
          }
        }
      }
      // when
      const data = await productController.updateProduct(mockRes as any, {} as any, {} as any, {} as any);
      // then
      expect(data).toStrictEqual(mockProduct);
    });

  });

  afterEach(async() => {
    await mongoServer.stop()
  })

});
