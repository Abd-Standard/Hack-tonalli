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
exports.Chapter = void 0;
const typeorm_1 = require("typeorm");
const chapter_module_entity_1 = require("./chapter-module.entity");
let Chapter = class Chapter {
    id;
    title;
    description;
    content;
    moduleTag;
    order;
    published;
    coverImage;
    estimatedMinutes;
    xpReward;
    releaseWeek;
    modules;
    createdAt;
    updatedAt;
};
exports.Chapter = Chapter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Chapter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chapter.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "moduleTag", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Chapter.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Chapter.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "estimatedMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Chapter.prototype, "xpReward", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chapter.prototype, "releaseWeek", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_module_entity_1.ChapterModule, (m) => m.chapter, { cascade: true }),
    __metadata("design:type", Array)
], Chapter.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chapter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Chapter.prototype, "updatedAt", void 0);
exports.Chapter = Chapter = __decorate([
    (0, typeorm_1.Entity)('chapters')
], Chapter);
//# sourceMappingURL=chapter.entity.js.map