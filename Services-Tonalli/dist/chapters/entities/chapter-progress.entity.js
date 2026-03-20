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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const chapter_entity_1 = require("./chapter.entity");
const chapter_module_entity_1 = require("./chapter-module.entity");
let ChapterProgress = class ChapterProgress {
    id;
    user;
    userId;
    chapter;
    chapterId;
    module;
    moduleId;
    infoCompleted;
    videoProgress;
    videoCompleted;
    quizCompleted;
    quizScore;
    quizAttempts;
    completed;
    score;
    attempts;
    lockedUntil;
    xpEarned;
    completedAt;
    createdAt;
};
exports.ChapterProgress = ChapterProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChapterProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], ChapterProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter),
    __metadata("design:type", chapter_entity_1.Chapter)
], ChapterProgress.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterProgress.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_module_entity_1.ChapterModule),
    __metadata("design:type", chapter_module_entity_1.ChapterModule)
], ChapterProgress.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterProgress.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChapterProgress.prototype, "infoCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "videoProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChapterProgress.prototype, "videoCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChapterProgress.prototype, "quizCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "quizScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "quizAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChapterProgress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "lockedUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterProgress.prototype, "xpEarned", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChapterProgress.prototype, "createdAt", void 0);
exports.ChapterProgress = ChapterProgress = __decorate([
    (0, typeorm_1.Entity)('chapter_progress')
], ChapterProgress);
//# sourceMappingURL=chapter-progress.entity.js.map