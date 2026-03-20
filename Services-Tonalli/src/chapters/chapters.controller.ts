import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, UseGuards, Request,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  // ── Public (any authenticated user) ──────────────────────────────────────

  /** GET /api/chapters — returns only published chapters */
  @UseGuards(JwtAuthGuard)
  @Get()
  findPublished() {
    return this.chaptersService.findPublished();
  }

  /** GET /api/chapters/:id — returns a single chapter */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(id);
  }

  // ── Admin only ────────────────────────────────────────────────────────────

  /** GET /api/chapters/admin/all — all chapters including unpublished */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/all')
  findAll() {
    return this.chaptersService.findAll();
  }

  /** POST /api/chapters — create new chapter */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.create(dto);
  }

  /** PATCH /api/chapters/:id — update chapter */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    return this.chaptersService.update(id, dto);
  }

  /** PATCH /api/chapters/:id/publish — toggle published */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/publish')
  togglePublish(@Param('id') id: string) {
    return this.chaptersService.togglePublish(id);
  }

  /** DELETE /api/chapters/:id — delete chapter */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(id);
  }
}
