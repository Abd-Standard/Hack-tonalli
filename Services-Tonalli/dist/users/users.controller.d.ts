import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<any>;
    updateProfile(req: any, body: {
        displayName?: string;
        city?: string;
        character?: string;
    }): Promise<any>;
    getRankings(): Promise<any[]>;
}
