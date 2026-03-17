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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_entity_1 = require("./entities/lesson.entity");
const quiz_entity_1 = require("./entities/quiz.entity");
const progress_entity_1 = require("../progress/entities/progress.entity");
let LessonsService = class LessonsService {
    lessonRepository;
    quizRepository;
    progressRepository;
    constructor(lessonRepository, quizRepository, progressRepository) {
        this.lessonRepository = lessonRepository;
        this.quizRepository = quizRepository;
        this.progressRepository = progressRepository;
    }
    async findAll(userId) {
        const lessons = await this.lessonRepository.find({
            where: { isActive: true },
            order: { order: 'ASC' },
        });
        if (!userId)
            return lessons;
        const userProgress = await this.progressRepository.find({
            where: { userId },
        });
        const progressMap = new Map(userProgress.map((p) => [p.lessonId, p]));
        return lessons.map((lesson) => {
            const progress = progressMap.get(lesson.id);
            return {
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                moduleId: lesson.moduleId,
                moduleName: lesson.moduleName,
                order: lesson.order,
                type: lesson.type,
                xpReward: lesson.xpReward,
                xlmReward: lesson.xlmReward,
                character: lesson.character,
                characterDialogue: lesson.characterDialogue,
                completed: progress?.completed || false,
                score: progress?.score || 0,
                attempts: progress?.attempts || 0,
            };
        });
    }
    async findById(id) {
        const lesson = await this.lessonRepository.findOne({ where: { id } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        let content = null;
        try {
            content = lesson.content ? JSON.parse(lesson.content) : null;
        }
        catch {
            content = lesson.content;
        }
        return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            moduleId: lesson.moduleId,
            moduleName: lesson.moduleName,
            order: lesson.order,
            type: lesson.type,
            content,
            xpReward: lesson.xpReward,
            xlmReward: lesson.xlmReward,
            character: lesson.character,
            characterDialogue: lesson.characterDialogue,
        };
    }
    async getQuizQuestions(lessonId) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        const quiz = await this.quizRepository.findOne({ where: { lessonId } });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found for this lesson');
        const pool = JSON.parse(quiz.questionsPool);
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, quiz.questionsPerAttempt);
        const questionsForClient = selected.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
        }));
        return {
            lessonId,
            lessonTitle: lesson.title,
            questions: questionsForClient,
            totalQuestions: questionsForClient.length,
            passingScore: quiz.passingScore,
        };
    }
    async validateQuizAnswers(lessonId, answers) {
        const quiz = await this.quizRepository.findOne({ where: { lessonId } });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        const pool = JSON.parse(quiz.questionsPool);
        const questionMap = new Map(pool.map((q) => [q.id, q]));
        let correctCount = 0;
        const results = answers.map((answer) => {
            const question = questionMap.get(answer.questionId);
            if (!question)
                return { questionId: answer.questionId, correct: false };
            const isCorrect = question.correctIndex === answer.selectedIndex;
            if (isCorrect)
                correctCount++;
            return {
                questionId: answer.questionId,
                correct: isCorrect,
                correctIndex: question.correctIndex,
                explanation: question.explanation,
            };
        });
        const score = answers.length > 0
            ? Math.round((correctCount / answers.length) * 100)
            : 0;
        const passed = score >= quiz.passingScore;
        return {
            score,
            passed,
            correctCount,
            totalQuestions: answers.length,
            results,
        };
    }
    async getModules() {
        const lessons = await this.lessonRepository.find({
            where: { isActive: true },
            order: { order: 'ASC' },
        });
        const moduleMap = new Map();
        lessons.forEach((lesson) => {
            if (!moduleMap.has(lesson.moduleId)) {
                moduleMap.set(lesson.moduleId, {
                    id: lesson.moduleId,
                    name: lesson.moduleName,
                    lessons: [],
                });
            }
            moduleMap.get(lesson.moduleId).lessons.push({
                id: lesson.id,
                title: lesson.title,
                order: lesson.order,
                type: lesson.type,
            });
        });
        return Array.from(moduleMap.values());
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(2, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map