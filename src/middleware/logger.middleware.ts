import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { format } from "date-fns";
import { enIN } from "date-fns/locale";
import { Message } from '../util/message';
import { Config } from '../util/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { 
      env: { debug }
    } = new Config()
    const startTime = Date.now()
    res.on('close', () => {
      const message = new Message();
      message.info([`[Nest] ${process.pid}`, format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: enIN }), '[LogInfo]', `{${req.url}, ${req.method}} time`, `+${Date.now()-startTime}ms`])
      if(Object.keys(req.body).length>0) {
        debug==='1'?console.log(req.body):''
      }
    })
    next();
  }
}