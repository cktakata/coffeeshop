import * as dotenv from 'dotenv';

export class Config {
    public env:{
        debug: string,
        db_url: string
    }
    constructor() {
        dotenv.config();
        const { env: {
            DEBUG: debug,
            DB_URL: db_url
        }} = process
        this.env = {
            debug,
            db_url
        }
    }
}