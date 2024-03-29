import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get('/healthcheck')
  @HttpCode(200)
  async healthCheck() {
    try {
      return await this.appService.healthCheck();
    } catch(e) {
      throw(e)
    }
  }
  
  @ApiExcludeEndpoint()
  @Get('/disconnect')
  @HttpCode(200)
  async disconnect() {
    try {
      await this.appService.disconnect();
    } catch(e) {
      throw(e)
    }
  }

}
