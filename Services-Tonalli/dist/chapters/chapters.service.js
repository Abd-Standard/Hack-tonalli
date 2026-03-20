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
exports.ChaptersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chapter_entity_1 = require("./entities/chapter.entity");
let ChaptersService = class ChaptersService {
    chaptersRepo;
    constructor(chaptersRepo) {
        this.chaptersRepo = chaptersRepo;
    }
    async create(dto) {
        const chapter = this.chaptersRepo.create(dto);
        return this.chaptersRepo.save(chapter);
    }
    async findAll() {
        return this.chaptersRepo.find({ order: { order: 'ASC', createdAt: 'DESC' } });
    }
    async findPublished() {
        return this.chaptersRepo.find({
            where: { published: true },
            order: { order: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const chapter = await this.chaptersRepo.findOne({ where: { id } });
        if (!chapter)
            throw new common_1.NotFoundException(`Chapter ${id} not found`);
        return chapter;
    }
    async update(id, dto) {
        const chapter = await this.findOne(id);
        Object.assign(chapter, dto);
        return this.chaptersRepo.save(chapter);
    }
    async remove(id) {
        const chapter = await this.findOne(id);
        await this.chaptersRepo.remove(chapter);
    }
    async togglePublish(id) {
        const chapter = await this.findOne(id);
        chapter.published = !chapter.published;
        return this.chaptersRepo.save(chapter);
    }
};
exports.ChaptersService = ChaptersService;
exports.ChaptersService = ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChaptersService);
//# sourceMappingURL=chapters.service.js.map