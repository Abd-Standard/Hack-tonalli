import { ChapterModule } from './chapter-module.entity';
export declare class Chapter {
    id: string;
    title: string;
    description: string;
    content: string;
    moduleTag: string;
    order: number;
    published: boolean;
    coverImage: string;
    estimatedMinutes: number;
    xpReward: number;
    releaseWeek: string;
    modules: ChapterModule[];
    createdAt: Date;
    updatedAt: Date;
}
