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
    setupUser(req: any, body: {
        companion: string;
        avatarType: string;
    }): Promise<import("./entities/user.entity").User>;
    upgradeToPremium(req: any): Promise<import("./entities/user.entity").User>;
    getRankings(): Promise<any[]>;
}
