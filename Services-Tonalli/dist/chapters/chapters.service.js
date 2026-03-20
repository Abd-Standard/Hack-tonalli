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
const chapter_module_entity_1 = require("./entities/chapter-module.entity");
const chapter_progress_entity_1 = require("./entities/chapter-progress.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ChaptersService = class ChaptersService {
    chaptersRepo;
    modulesRepo;
    progressRepo;
    usersRepo;
    constructor(chaptersRepo, modulesRepo, progressRepo, usersRepo) {
        this.chaptersRepo = chaptersRepo;
        this.modulesRepo = modulesRepo;
        this.progressRepo = progressRepo;
        this.usersRepo = usersRepo;
    }
    async create(dto) {
        const chapter = this.chaptersRepo.create(dto);
        const saved = await this.chaptersRepo.save(chapter);
        const moduleTypes = [
            { type: 'info', order: 1, title: 'Contenido informativo' },
            { type: 'video', order: 2, title: 'Video explicativo' },
            { type: 'quiz', order: 3, title: 'Quiz de evaluación' },
            { type: 'final_exam', order: 4, title: 'Examen final' },
        ];
        for (const mt of moduleTypes) {
            const mod = this.modulesRepo.create({
                chapterId: saved.id,
                type: mt.type,
                order: mt.order,
                title: mt.title,
                passingScore: 80,
                questionsPerAttempt: mt.type === 'quiz' ? 5 : mt.type === 'final_exam' ? 10 : 0,
                xpReward: mt.type === 'quiz' ? 25 : mt.type === 'final_exam' ? 50 : mt.type === 'info' ? 10 : 10,
            });
            await this.modulesRepo.save(mod);
        }
        return this.findOne(saved.id);
    }
    async findAll() {
        return this.chaptersRepo.find({
            relations: ['modules'],
            order: { order: 'ASC', createdAt: 'DESC' },
        });
    }
    async findPublished() {
        return this.chaptersRepo.find({
            where: { published: true },
            relations: ['modules'],
            order: { order: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const chapter = await this.chaptersRepo.findOne({
            where: { id },
            relations: ['modules'],
        });
        if (!chapter)
            throw new common_1.NotFoundException(`Chapter ${id} not found`);
        if (chapter.modules) {
            chapter.modules.sort((a, b) => a.order - b.order);
        }
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
    async updateModule(moduleId, data) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod)
            throw new common_1.NotFoundException('Module not found');
        Object.assign(mod, data);
        return this.modulesRepo.save(mod);
    }
    async getChapterWithProgress(chapterId, userId) {
        const chapter = await this.findOne(chapterId);
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        const progresses = await this.progressRepo.find({
            where: { chapterId, userId },
        });
        const progressMap = new Map(progresses.map((p) => [p.moduleId, p]));
        const modulesWithProgress = chapter.modules.map((mod, index) => {
            const progress = progressMap.get(mod.id);
            let unlocked = false;
            if (mod.order === 1) {
                unlocked = true;
            }
            else if (mod.order === 2) {
                const mod1 = chapter.modules.find((m) => m.order === 1);
                const mod1Progress = mod1 ? progressMap.get(mod1.id) : null;
                unlocked = !!mod1Progress?.completed;
            }
            else if (mod.order === 3) {
                const mod2 = chapter.modules.find((m) => m.order === 2);
                const mod2Progress = mod2 ? progressMap.get(mod2.id) : null;
                unlocked = !!mod2Progress?.completed;
            }
            else if (mod.order === 4) {
                const mod3 = chapter.modules.find((m) => m.order === 3);
                const mod3Progress = mod3 ? progressMap.get(mod3.id) : null;
                const mod3Passed = mod3Progress?.completed && mod3Progress.score >= 80;
                if (user?.isPremium) {
                    unlocked = !!mod3Passed;
                }
                else {
                    unlocked = !!mod3Passed && !!progress;
                }
            }
            let livesRemaining = 3;
            let lockedUntil = null;
            if ((mod.type === 'quiz' || mod.type === 'final_exam') && !user?.isPremium) {
                const attempts = progress?.attempts || 0;
                const failedAttempts = progress?.completed ? 0 : attempts;
                if (failedAttempts >= 3 && progress?.lockedUntil) {
                    const lockTime = new Date(progress.lockedUntil);
                    if (lockTime > new Date()) {
                        lockedUntil = lockTime.toISOString();
                        livesRemaining = 0;
                    }
                    else {
                        livesRemaining = 3;
                    }
                }
                else {
                    livesRemaining = Math.max(0, 3 - failedAttempts);
                }
            }
            else {
                livesRemaining = -1;
            }
            return {
                id: mod.id,
                type: mod.type,
                order: mod.order,
                title: mod.title,
                content: mod.type === 'info' ? mod.content : undefined,
                videoUrl: mod.type === 'video' ? mod.videoUrl : undefined,
                hasQuiz: mod.type === 'quiz' || mod.type === 'final_exam',
                xpReward: mod.xpReward,
                unlocked,
                completed: !!progress?.completed,
                score: progress?.score || 0,
                attempts: progress?.attempts || 0,
                videoProgress: progress?.videoProgress || 0,
                livesRemaining,
                lockedUntil,
            };
        });
        const completedModules = modulesWithProgress.filter((m) => m.completed).length;
        const completionPercent = Math.round((completedModules / 4) * 100);
        return {
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            coverImage: chapter.coverImage,
            moduleTag: chapter.moduleTag,
            xpReward: chapter.xpReward,
            modules: modulesWithProgress,
            completionPercent,
            isPremium: user?.isPremium || false,
        };
    }
    async completeInfoModule(moduleId, userId) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod || mod.type !== 'info')
            throw new common_1.BadRequestException('Not an info module');
        let progress = await this.progressRepo.findOne({
            where: { moduleId, userId },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                userId,
                chapterId: mod.chapterId,
                moduleId,
                completed: true,
                score: 100,
                xpEarned: mod.xpReward,
                completedAt: new Date(),
            });
        }
        else {
            progress.completed = true;
            progress.score = 100;
            progress.completedAt = new Date();
        }
        return this.progressRepo.save(progress);
    }
    async updateVideoProgress(moduleId, userId, percent) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod || mod.type !== 'video')
            throw new common_1.BadRequestException('Not a video module');
        let progress = await this.progressRepo.findOne({
            where: { moduleId, userId },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                userId,
                chapterId: mod.chapterId,
                moduleId,
                videoProgress: percent,
            });
        }
        progress.videoProgress = Math.max(progress.videoProgress, percent);
        if (progress.videoProgress >= 90 && !progress.completed) {
            progress.completed = true;
            progress.score = 100;
            progress.xpEarned = mod.xpReward;
            progress.completedAt = new Date();
        }
        return this.progressRepo.save(progress);
    }
    async getQuizQuestions(moduleId, userId) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
            throw new common_1.BadRequestException('Not a quiz module');
        }
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user?.isPremium) {
            const progress = await this.progressRepo.findOne({
                where: { moduleId, userId },
            });
            if (progress && !progress.completed) {
                if (progress.attempts >= 3 && progress.lockedUntil) {
                    const lockTime = new Date(progress.lockedUntil);
                    if (lockTime > new Date()) {
                        throw new common_1.ForbiddenException({
                            message: 'Quiz bloqueado. Espera para intentar de nuevo.',
                            lockedUntil: lockTime.toISOString(),
                            livesRemaining: 0,
                        });
                    }
                    progress.attempts = 0;
                    progress.lockedUntil = undefined;
                    await this.progressRepo.save(progress);
                }
            }
        }
        const pool = mod.questionsPool ? JSON.parse(mod.questionsPool) : [];
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, mod.questionsPerAttempt || 5);
        const questionsWithShuffledOptions = selected.map((q) => {
            const indices = q.options.map((_, i) => i);
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            const shuffledOptions = indices.map((i) => q.options[i]);
            const newCorrectIndex = indices.indexOf(q.correctIndex);
            return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
        });
        const attemptToken = `${moduleId}_${userId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        return {
            moduleId: mod.id,
            chapterId: mod.chapterId,
            type: mod.type,
            passingScore: mod.passingScore,
            totalQuestions: questionsWithShuffledOptions.length,
            attemptToken,
            questions: questionsWithShuffledOptions.map((q) => ({
                id: q.id,
                question: q.question,
                options: q.options,
            })),
        };
    }
    async submitQuiz(moduleId, userId, answers) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
            throw new common_1.BadRequestException('Not a quiz module');
        }
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const pool = mod.questionsPool ? JSON.parse(mod.questionsPool) : [];
        const questionMap = new Map(pool.map((q) => [q.id, q]));
        let correctCount = 0;
        const results = answers.map((a) => {
            const q = questionMap.get(a.questionId);
            if (!q)
                return { questionId: a.questionId, correct: false };
            const isCorrect = q.correctIndex === a.selectedIndex;
            if (isCorrect)
                correctCount++;
            return {
                questionId: a.questionId,
                correct: isCorrect,
                correctIndex: q.correctIndex,
                explanation: q.explanation,
            };
        });
        const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
        const passed = score >= mod.passingScore;
        let progress = await this.progressRepo.findOne({
            where: { moduleId, userId },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                userId,
                chapterId: mod.chapterId,
                moduleId,
                attempts: 0,
                score: 0,
                xpEarned: 0,
            });
        }
        progress.attempts += 1;
        progress.score = Math.max(progress.score, score);
        if (passed && !progress.completed) {
            progress.completed = true;
            progress.completedAt = new Date();
            progress.xpEarned = mod.xpReward;
            user.xp += mod.xpReward;
            user.totalXp += mod.xpReward;
            await this.usersRepo.save(user);
        }
        let livesRemaining = -1;
        let lockedUntil = null;
        if (!user?.isPremium && !passed) {
            const failedAttempts = progress.attempts;
            if (failedAttempts >= 3) {
                const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                progress.lockedUntil = lockDate;
                lockedUntil = lockDate.toISOString();
                livesRemaining = 0;
            }
            else {
                livesRemaining = 3 - failedAttempts;
            }
        }
        await this.progressRepo.save(progress);
        return {
            score,
            passed,
            correctCount,
            totalQuestions: answers.length,
            results,
            xpEarned: passed ? mod.xpReward : 0,
            livesRemaining,
            lockedUntil,
            message: passed
                ? '¡Felicidades! Has aprobado.'
                : livesRemaining === 0
                    ? '¡Sin vidas! Espera 24 horas para intentar de nuevo.'
                    : `Necesitas ${mod.passingScore}% para pasar. Obtuviste ${score}%. Te quedan ${livesRemaining} vidas.`,
        };
    }
    async reportQuizAbandon(moduleId, userId, reason) {
        const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
        if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
            throw new common_1.BadRequestException('Not a quiz module');
        }
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        let progress = await this.progressRepo.findOne({
            where: { moduleId, userId },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                userId,
                chapterId: mod.chapterId,
                moduleId,
                attempts: 0,
                score: 0,
                xpEarned: 0,
            });
        }
        if (progress.completed) {
            return { penalized: false, reason: 'already_completed' };
        }
        progress.attempts += 1;
        let livesRemaining = -1;
        let lockedUntil = null;
        if (!user?.isPremium) {
            const failedAttempts = progress.attempts;
            if (failedAttempts >= 3) {
                const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                progress.lockedUntil = lockDate;
                lockedUntil = lockDate.toISOString();
                livesRemaining = 0;
            }
            else {
                livesRemaining = 3 - failedAttempts;
            }
        }
        await this.progressRepo.save(progress);
        return {
            penalized: true,
            reason,
            livesRemaining,
            lockedUntil,
            message: livesRemaining === 0
                ? 'Perdiste todas tus vidas por abandonar el quiz. Espera 24 horas.'
                : `Perdiste una vida por abandonar el quiz. Te quedan ${livesRemaining} vidas.`,
        };
    }
    async unlockFinalExam(chapterId, userId) {
        const chapter = await this.findOne(chapterId);
        const mod4 = chapter.modules.find((m) => m.order === 4);
        if (!mod4)
            throw new common_1.NotFoundException('Final exam module not found');
        const mod3 = chapter.modules.find((m) => m.order === 3);
        if (mod3) {
            const mod3Progress = await this.progressRepo.findOne({
                where: { moduleId: mod3.id, userId },
            });
            if (!mod3Progress?.completed || mod3Progress.score < 80) {
                throw new common_1.ForbiddenException('Debes aprobar el quiz (Módulo 3) primero');
            }
        }
        let progress = await this.progressRepo.findOne({
            where: { moduleId: mod4.id, userId },
        });
        if (!progress) {
            progress = this.progressRepo.create({
                userId,
                chapterId,
                moduleId: mod4.id,
                completed: false,
                score: 0,
                attempts: 0,
            });
            await this.progressRepo.save(progress);
        }
        return { unlocked: true, moduleId: mod4.id };
    }
    async getChapterCompletion(chapterId, userId) {
        const chapter = await this.findOne(chapterId);
        const progresses = await this.progressRepo.find({
            where: { chapterId, userId },
        });
        const completedModules = progresses.filter((p) => p.completed).length;
        const percent = Math.round((completedModules / 4) * 100);
        return {
            chapterId,
            completedModules,
            totalModules: 4,
            percent,
            isFullyCompleted: completedModules === 4,
        };
    }
};
exports.ChaptersService = ChaptersService;
exports.ChaptersService = ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __param(1, (0, typeorm_1.InjectRepository)(chapter_module_entity_1.ChapterModule)),
    __param(2, (0, typeorm_1.InjectRepository)(chapter_progress_entity_1.ChapterProgress)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChaptersService);
//# sourceMappingURL=chapters.service.js.map