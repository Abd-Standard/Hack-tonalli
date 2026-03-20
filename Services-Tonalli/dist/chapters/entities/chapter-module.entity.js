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
exports.ChapterModule = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("./chapter.entity");
let ChapterModule = class ChapterModule {
    id;
    chapter;
    chapterId;
    type;
    order;
    title;
    content;
    videoUrl;
    questionsPool;
    questionsPerAttempt;
    passingScore;
    xpReward;
    createdAt;
    updatedAt;
};
exports.ChapterModule = ChapterModule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChapterModule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chapter_entity_1.Chapter, (chapter) => chapter.modules, { onDelete: 'CASCADE' }),
    __metadata("design:type", chapter_entity_1.Chapter)
], ChapterModule.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterModule.prototype, "chapterId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChapterModule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChapterModule.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ChapterModule.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], ChapterModule.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ChapterModule.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], ChapterModule.prototype, "questionsPool", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 5 }),
    __metadata("design:type", Number)
], ChapterModule.prototype, "questionsPerAttempt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 80 }),
    __metadata("design:type", Number)
], ChapterModule.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChapterModule.prototype, "xpReward", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChapterModule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChapterModule.prototype, "updatedAt", void 0);
exports.ChapterModule = ChapterModule = __decorate([
    (0, typeorm_1.Entity)('chapter_modules')
], ChapterModule);
//# sourceMappingURL=chapter-module.entity.js.map