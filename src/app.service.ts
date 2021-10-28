import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async healthCheck(): Promise<any> {
    try {
      return await this.databaseService.healthcheck()?'Service is healthy':'Error'
    } catch(err) {
      return 'Error'
    }
  }

}
