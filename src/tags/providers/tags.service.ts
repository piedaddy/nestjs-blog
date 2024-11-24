import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);
    await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tagIds: number[]) {
    const results = await this.tagsRepository.find({
      where: {
        id: In(tagIds),
      },
    });

    return results;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }

  public async softDelete(id: number) {
    //will just create a timestamp and not remove it from the DB
    await this.tagsRepository.softDelete(id);
  }
}
