"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async create(data) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async update(id, data) {
        await this.userRepository.update(id, data);
        return this.findById(id);
    }
    async addXP(userId, xp) {
        const user = await this.findById(userId);
        user.xp += xp;
        user.totalXp += xp;
        return this.userRepository.save(user);
    }
    async updateStreak(userId) {
        const user = await this.findById(userId);
        const today = new Date().toISOString().split('T')[0];
        const lastActivity = user.lastActivityDate;
        if (lastActivity === today) {
            return user;
        }
        const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split('T')[0];
        if (lastActivity === yesterday) {
            user.currentStreak += 1;
        }
        else {
            user.currentStreak = 1;
        }
        user.lastActivityDate = today;
        return this.userRepository.save(user);
    }
    async setupUser(userId, companion, avatarType) {
        await this.userRepository.update(userId, {
            companion,
            avatarType,
            isFirstLogin: false,
        });
        return this.findById(userId);
    }
    async getProfile(userId) {
        const user = await this.findById(userId);
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.displayName,
            city: user.city,
            xp: user.xp,
            totalXp: user.totalXp,
            currentStreak: user.currentStreak,
            lastActivityDate: user.lastActivityDate,
            walletAddress: user.stellarPublicKey,
            character: user.character,
            isPremium: user.isPremium || false,
            subscriptionExpiry: user.subscriptionExpiry,
            isFirstLogin: user.isFirstLogin,
            companion: user.companion,
            avatarType: user.avatarType,
            createdAt: user.createdAt,
        };
    }
    async getRankings() {
        const users = await this.userRepository.find({
            order: { totalXp: 'DESC' },
            take: 50,
        });
        return users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            displayName: user.displayName || user.username,
            city: user.city || 'Ciudad de México',
            xp: user.totalXp,
            streak: user.currentStreak,
            character: user.character || 'chima',
        }));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map