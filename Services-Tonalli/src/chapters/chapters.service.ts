import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chaptersRepo: Repository<Chapter>,
  ) {}

  // Admin: create
  async create(dto: CreateChapterDto): Promise<Chapter> {
    const chapter = this.chaptersRepo.create(dto);
    return this.chaptersRepo.save(chapter);
  }

  // Admin: get all (including unpublished)
  async findAll(): Promise<Chapter[]> {
    return this.chaptersRepo.find({ order: { order: 'ASC', createdAt: 'DESC' } });
  }

  // Users: get only published
  async findPublished(): Promise<Chapter[]> {
    return this.chaptersRepo.find({
      where: { published: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  // Both: get one by id
  async findOne(id: string): Promise<Chapter> {
    const chapter = await this.chaptersRepo.findOne({ where: { id } });
    if (!chapter) throw new NotFoundException(`Chapter ${id} not found`);
    return chapter;
  }

  // Admin: update
  async update(id: string, dto: UpdateChapterDto): Promise<Chapter> {
    const chapter = await this.findOne(id);
    Object.assign(chapter, dto);
    return this.chaptersRepo.save(chapter);
  }

  // Admin: delete
  async remove(id: string): Promise<void> {
    const chapter = await this.findOne(id);
    await this.chaptersRepo.remove(chapter);
  }

  // Admin: toggle publish
  async togglePublish(id: string): Promise<Chapter> {
    const chapter = await this.findOne(id);
    chapter.published = !chapter.published;
    return this.chaptersRepo.save(chapter);
  }
}
