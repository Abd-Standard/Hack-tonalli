import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChaptersController {
    private readonly chaptersService;
    constructor(chaptersService: ChaptersService);
    findPublished(): Promise<import("./entities/chapter.entity").Chapter[]>;
    findOne(id: string): Promise<import("./entities/chapter.entity").Chapter>;
    findAll(): Promise<import("./entities/chapter.entity").Chapter[]>;
    create(dto: CreateChapterDto): Promise<import("./entities/chapter.entity").Chapter>;
    update(id: string, dto: UpdateChapterDto): Promise<import("./entities/chapter.entity").Chapter>;
    togglePublish(id: string): Promise<import("./entities/chapter.entity").Chapter>;
    remove(id: string): Promise<void>;
}
