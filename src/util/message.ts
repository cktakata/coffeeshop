import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export class Message {
    private logMask: string;
    constructor() {
        this.logMask = '\x1b[32m%s   - \x1b[0m%s   \x1b[33m%s \x1b[32m%s \x1b[33m%s\x1b[0m';
    }
    info(parameters: Array<string>) {
        this.logMask = '\x1b[32m%s   -\x1b[0m%s     \x1b[33m%s \x1b[32m%s \x1b[33m%s\x1b[0m';
        parameters.unshift(this.logMask)
        console.info.apply( this, parameters )
    }
    log(parameters: Array<string>) {
        this.logMask = '\x1b[32m%s  - \x1b[0m%s     \x1b[33m%s \x1b[32m%s \x1b[33m%s\x1b[0m';
        parameters.unshift(format(new Date(), "dd/MM/yyyy H:mm:ss", { locale: ptBR }))
        parameters.unshift(`[Nest] ${process.pid}`)
        parameters.unshift(this.logMask)
        parameters.push('')
        console.info.apply( this, parameters )
    }
    error(parameters: Array<string>) {
        this.logMask = '\x1b[32m%s  - \x1b[0m%s     \x1b[33m%s \x1b[31m%s \x1b[33m%s\x1b[0m';
        parameters.unshift(format(new Date(), "dd/MM/yyyy H:mm:ss", { locale: ptBR }))
        parameters.unshift(`[Nest] ${process.pid}`)
        parameters.unshift(this.logMask)
        parameters.push('')
        console.info.apply( this, parameters )
    }
}