import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChaptersService {
    private readonly chaptersRepo;
    constructor(chaptersRepo: Repository<Chapter>);
    create(dto: CreateChapterDto): Promise<Chapter>;
    findAll(): Promise<Chapter[]>;
    findPublished(): Promise<Chapter[]>;
    findOne(id: string): Promise<Chapter>;
    update(id: string, dto: UpdateChapterDto): Promise<Chapter>;
    remove(id: string): Promise<void>;
    togglePublish(id: string): Promise<Chapter>;
}
