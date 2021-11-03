import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { productProviders } from './product/product.provider';
import * as mongoose from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";
import { databaseProviders } from './database/database.provider';

describe('AppController', () => {
  let appController: AppController;
  let mongoServer;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const URI = await mongoServer.getUri();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService, DatabaseService, ...productProviders, ...databaseProviders],
      providers: [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> => mongoose.connect(URI), 
      },
      AppService,
      DatabaseService,
      ...productProviders],
    })
    .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.healthCheck()).toBe("Service is healthy");
      await appController.disconnect();
      await mongoose.disconnect();
    });
  });

  afterAll(async() => {
    await mongoose.disconnect();
  });
});
