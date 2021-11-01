import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database/database.provider';
import { DatabaseService } from './database/database.service';
import { productProviders } from './product/product.provider';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DatabaseService, ...productProviders, ...databaseProviders],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.healthCheck()).toBe("Service is healthy");
      await appController.disconnect();
    });
  });
  
});
