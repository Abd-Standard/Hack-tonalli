import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getInfo(): {
        name: string;
        description: string;
        version: string;
        characters: string[];
        network: string;
        docs: string;
    };
    healthCheck(): {
        status: string;
        app: string;
        timestamp: string;
    };
}
