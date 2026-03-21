import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    addXP(userId: string, xp: number): Promise<User>;
    updateStreak(userId: string): Promise<User>;
    setupUser(userId: string, companion: string, avatarType: string): Promise<User>;
    getProfile(userId: string): Promise<any>;
    upgradeToPremium(userId: string): Promise<User>;
    getRankings(): Promise<any[]>;
}
