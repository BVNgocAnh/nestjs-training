import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/guard/roles.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('edit-comment/:comment_id')
  update(
    @Param('comment_id') comment_id: number,
    @Req() req: any,
    @Body() body: any,
  ) {
    return this.commentService.editComment(comment_id, req.user_id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-comment/:comment_id')
  remove(@Req() req: any, @Param('comment_id') comment_id: number) {
    return this.commentService.removeComment(req.user_id, comment_id);
  }
}
