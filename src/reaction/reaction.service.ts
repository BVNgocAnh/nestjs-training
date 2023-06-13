import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionPostEntity } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionPostEntity)
    private reactionRepository: Repository<ReactionPostEntity>,
  ) {}
  create(createReactionDto: CreateReactionDto) {
    return 'This action adds a new reaction';
  }

  findAll() {
    return `This action returns all reaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reaction`;
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    return `This action updates a #${id} reaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} reaction`;
  }
}
