"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bcrypt = __importStar(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
const quiz_entity_1 = require("../lessons/entities/quiz.entity");
const progress_entity_1 = require("../progress/entities/progress.entity");
const nft_certificate_entity_1 = require("../progress/entities/nft-certificate.entity");
const streak_entity_1 = require("../users/entities/streak.entity");
const chapter_entity_1 = require("../chapters/entities/chapter.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tonalli',
    entities: [user_entity_1.User, lesson_entity_1.Lesson, quiz_entity_1.Quiz, progress_entity_1.Progress, nft_certificate_entity_1.NFTCertificate, streak_entity_1.Streak, chapter_entity_1.Chapter],
    synchronize: true,
    logging: false,
    charset: 'utf8mb4',
});
async function resetPasswords() {
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(user_entity_1.User);
    const accounts = [
        { email: 'admin@tonalli.mx', password: 'Admin2024!', role: 'admin', username: 'TonalliAdmin' },
        { email: 'demo@tonalli.mx', password: 'Demo2024!', role: 'user', username: 'CryptoAzteca' },
    ];
    for (const acc of accounts) {
        const hashed = await bcrypt.hash(acc.password, 10);
        let user = await userRepo.findOne({ where: { email: acc.email } });
        if (user) {
            user.password = hashed;
            user.role = acc.role;
            await userRepo.save(user);
            console.log(`✅ Password updated: ${acc.email} → ${acc.password}  (role: ${acc.role})`);
        }
        else {
            user = userRepo.create({
                email: acc.email,
                username: acc.username,
                displayName: acc.role === 'admin' ? 'Administrador' : 'Demo User',
                password: hashed,
                city: 'Ciudad de México',
                role: acc.role,
                xp: 0, totalXp: 0, currentStreak: 0,
                stellarPublicKey: `G${acc.role.toUpperCase()}_DEMO`,
                stellarSecretKey: `S${acc.role.toUpperCase()}_DEMO`,
            });
            await userRepo.save(user);
            console.log(`✅ User created: ${acc.email} → ${acc.password}  (role: ${acc.role})`);
        }
    }
    console.log('\n📋 Credenciales listas:');
    console.log('   Admin  → admin@tonalli.mx  /  Admin2024!');
    console.log('   Usuario → demo@tonalli.mx   /  Demo2024!');
    await AppDataSource.destroy();
}
resetPasswords().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
//# sourceMappingURL=reset-passwords.js.map