import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(private readonly databaseService: DatabaseService) {}

  async healthCheck(): Promise<any> {
    try {
      return await this.databaseService.healthcheck()?'Service is healthy':'Error'
    } catch(err) {
      return new Error('Error')
    }
  }

  async disconnect(): Promise<any> {
    try {
      await this.databaseService.disconnect()
    } catch(err) {
      return new Error('Error')
    }
  }
}
